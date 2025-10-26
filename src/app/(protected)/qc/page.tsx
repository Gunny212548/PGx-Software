"use client";

import { useState } from "react";
import { FileUp, ClipboardList, FileSpreadsheet, PlusCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function QCPage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState("sop");
  const [qcLogs, setQcLogs] = useState<any[]>([]);
  const [newQc, setNewQc] = useState({ parameter: "", result: "", note: "" });
  const [files, setFiles] = useState<string[]>([]);

  const handleAddQC = () => {
    if (!newQc.parameter || !newQc.result) return alert(language === "en" ? "Please fill all QC fields" : "กรุณากรอกข้อมูลให้ครบ");
    const log = { ...newQc, date: new Date().toLocaleString() };
    const updated = [log, ...qcLogs];
    setQcLogs(updated);
    localStorage.setItem("qcLogs", JSON.stringify(updated));
    setNewQc({ parameter: "", result: "", note: "" });
    alert(language === "en" ? "QC record saved." : "บันทึก QC สำเร็จ");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []).map((f) => f.name);
    const updated = [...files, ...fileList];
    setFiles(updated);
    localStorage.setItem("qcFiles", JSON.stringify(updated));
    alert(language === "en" ? "File uploaded (mock)." : "อัปโหลดไฟล์แล้ว (จำลอง)");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en" ? "QC & Training" : "ควบคุมคุณภาพและอบรม (QC & Training)"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "SOP management, QC logs, and training records"
          : "จัดการ SOP, บันทึก QC, และ Training Log"}
      </p>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button className={`${styles.tabBtn} ${tab === "sop" ? styles.active : ""}`} onClick={() => setTab("sop")}>
          📘 {language === "en" ? "SOP Library" : "คลัง SOP"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "qc" ? styles.active : ""}`} onClick={() => setTab("qc")}>
          🧾 {language === "en" ? "Daily QC Form" : "บันทึก QC ประจำวัน"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "docs" ? styles.active : ""}`} onClick={() => setTab("docs")}>
          📂 {language === "en" ? "QC Documents" : "เอกสารคุณภาพ"}
        </button>
      </div>

      {/* ---------- SOP Library ---------- */}
      {tab === "sop" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "SOP Library" : "คลัง SOP"}</h2>
          <p>{language === "en" ? "Version control, approval, and review logs" : "ระบบควบคุมเวอร์ชัน อนุมัติ และทบทวน SOP"}</p>

          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{language === "en" ? "SOP Title" : "ชื่อ SOP"}</th>
                  <th>Version</th>
                  <th>{language === "en" ? "Owner" : "ผู้จัดทำ"}</th>
                  <th>{language === "en" ? "Approved by" : "ผู้อนุมัติ"}</th>
                  <th>{language === "en" ? "Last Review" : "วันที่ทบทวน"}</th>
                  <th>{language === "en" ? "Status" : "สถานะ"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PGx Sample Handling SOP</td>
                  <td>v2.1</td>
                  <td>Tech. A</td>
                  <td>Dr. B</td>
                  <td>2025-05-12</td>
                  <td><CheckCircle2 color="#4ca771" /> Approved</td>
                </tr>
                <tr>
                  <td>DNA Extraction SOP</td>
                  <td>v1.5</td>
                  <td>Tech. C</td>
                  <td>Dr. B</td>
                  <td>2025-03-20</td>
                  <td><CheckCircle2 color="#4ca771" /> Approved</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.note}>
            {language === "en"
              ? "Personnel training is logged automatically after review."
              : "ระบบบันทึกการอบรมของบุคลากรอัตโนมัติหลังการอ่าน/ทบทวน SOP"}
          </p>
        </div>
      )}

      {/* ---------- DAILY QC ---------- */}
      {tab === "qc" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "Daily QC Record" : "บันทึก QC ประจำวัน"}</h2>
          <div className={styles.qcForm}>
            <input
              className={styles.input}
              placeholder={language === "en" ? "Parameter" : "พารามิเตอร์"}
              value={newQc.parameter}
              onChange={(e) => setNewQc({ ...newQc, parameter: e.target.value })}
            />
            <select
              className={styles.input}
              value={newQc.result}
              onChange={(e) => setNewQc({ ...newQc, result: e.target.value })}
            >
              <option value="">{language === "en" ? "Result" : "ผล"}</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
            <input
              className={styles.input}
              placeholder={language === "en" ? "Note (optional)" : "หมายเหตุ"}
              value={newQc.note}
              onChange={(e) => setNewQc({ ...newQc, note: e.target.value })}
            />
            <button className={styles.addBtn} onClick={handleAddQC}>
              <PlusCircle size={18} /> {language === "en" ? "Save QC" : "บันทึก QC"}
            </button>
          </div>

          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{language === "en" ? "Parameter" : "พารามิเตอร์"}</th>
                  <th>Result</th>
                  <th>{language === "en" ? "Note" : "หมายเหตุ"}</th>
                  <th>{language === "en" ? "Date" : "วันที่บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                {qcLogs.length === 0 ? (
                  <tr><td colSpan={4}>{language === "en" ? "No QC record yet." : "ยังไม่มีการบันทึก QC"}</td></tr>
                ) : (
                  qcLogs.map((q, i) => (
                    <tr key={i}>
                      <td>{q.parameter}</td>
                      <td>{q.result}</td>
                      <td>{q.note}</td>
                      <td>{q.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- QC DOCUMENTS ---------- */}
      {tab === "docs" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "QC Documents" : "เอกสารคุณภาพ"}</h2>
          <p>{language === "en" ? "Upload IQC/EQA/Validation documents (mock)" : "อัปโหลดเอกสาร IQC / EQA / Validation (จำลอง)"}</p>

          <input type="file" multiple onChange={handleFileUpload} className={styles.fileInput} />
          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{language === "en" ? "File name" : "ชื่อไฟล์"}</th>
                  <th>{language === "en" ? "Upload date" : "วันที่อัปโหลด"}</th>
                </tr>
              </thead>
              <tbody>
                {files.length === 0 ? (
                  <tr><td colSpan={2}>{language === "en" ? "No files uploaded." : "ยังไม่มีไฟล์"}</td></tr>
                ) : (
                  files.map((f, i) => (
                    <tr key={i}>
                      <td>{f}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

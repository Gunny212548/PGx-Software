"use client";

import { useEffect, useState } from "react";
import { QrCode, FileSearch, Check, X } from "lucide-react";
import QRCode from "react-qr-code";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

interface Patient {
  idCard: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface SpecimenItem {
  type: string;
  minVolume: string;
  container: string;
  temperature: string;
  rejection: string;
  custody: string;
}

export default function SpecimenPage() {
  const { language } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchId, setSearchId] = useState("");
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null);
  const [rejected, setRejected] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(stored);
  }, []);

  const catalog: SpecimenItem[] = [
    {
      type: language === "en" ? "Whole blood (EDTA)" : "เลือด (EDTA)",
      minVolume: "2 mL",
      container: language === "en" ? "Purple cap tube" : "หลอดฝาม่วง",
      temperature: "2–8°C",
      rejection:
        language === "en"
          ? "Hemolyzed, clotted, insufficient volume"
          : "ตัวอย่างสลายตัว, มีลิ่มเลือด, ปริมาณไม่พอ",
      custody:
        language === "en"
          ? "Documented by accession ID, timestamp, and receiver signature"
          : "บันทึกด้วยรหัสรับสิ่งส่งตรวจ, เวลา, และผู้รับ",
    },
    {
      type: language === "en" ? "Buccal swab" : "Swab กระพุ้งแก้ม",
      minVolume: "2 swabs",
      container: language === "en" ? "Swab tube" : "หลอดเก็บ swab",
      temperature: "RT (Room Temp)",
      rejection:
        language === "en"
          ? "Contaminated or dry swab"
          : "สิ่งส่งตรวจแห้งหรือปนเปื้อน",
      custody:
        language === "en"
          ? "Linked to accession batch with lab tracking"
          : "เชื่อมกับชุดรับสิ่งส่งตรวจและระบบติดตามแล็บ",
    },
  ];

  const handleSearch = () => {
    const found = patients.find((p) => p.idCard === searchId);
    setFoundPatient(found || null);
    setRejected(false);
    setRejectReason("");
  };

  const handleAccept = () => {
    alert(
      language === "en"
        ? "✅ Specimen accepted and logged."
        : "✅ รับสิ่งส่งตรวจเรียบร้อยแล้ว"
    );
    setSearchId("");
    setFoundPatient(null);
  };

  const handleReject = () => {
    if (!rejectReason) {
      alert(
        language === "en"
          ? "Please specify rejection reason."
          : "กรุณาระบุเหตุผลในการปฏิเสธ"
      );
      return;
    }
    alert(
      language === "en"
        ? `❌ Specimen rejected: ${rejectReason}`
        : `❌ ปฏิเสธสิ่งส่งตรวจ: ${rejectReason}`
    );
    setRejected(false);
    setRejectReason("");
    setSearchId("");
    setFoundPatient(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en"
          ? "Specimen Accessioning"
          : "รับสิ่งส่งตรวจ (Specimen Accessioning)"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "Record and verify specimen acceptance"
          : "บันทึกและตรวจสอบการรับสิ่งส่งตรวจ"}
      </p>

      {/* Catalog */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {language === "en"
            ? "Specimen Catalog"
            : "แค็ตตาล็อกสิ่งส่งตรวจ"}
        </h2>
        <div className={styles.tableBox}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{language === "en" ? "Type" : "ชนิดสิ่งส่งตรวจ"}</th>
                <th>
                  {language === "en" ? "Min Volume" : "ปริมาณขั้นต่ำ"}
                </th>
                <th>
                  {language === "en" ? "Container" : "ภาชนะ"}
                </th>
                <th>
                  {language === "en" ? "Temperature" : "อุณหภูมิขนส่ง"}
                </th>
                <th>
                  {language === "en"
                    ? "Rejection Criteria"
                    : "เกณฑ์การปฏิเสธ"}
                </th>
                <th>
                  {language === "en"
                    ? "Chain of Custody"
                    : "Chain-of-Custody"}
                </th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((c, i) => (
                <tr key={i}>
                  <td>{c.type}</td>
                  <td>{c.minVolume}</td>
                  <td>{c.container}</td>
                  <td>{c.temperature}</td>
                  <td>{c.rejection}</td>
                  <td>{c.custody}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessioning */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {language === "en"
            ? "Specimen Accessioning"
            : "สแกนรับสิ่งส่งตรวจ"}
        </h2>

        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value.replace(/\D/g, "").slice(0, 13))}
            placeholder={
              language === "en"
                ? "Scan or enter HN / ID (13 digits)"
                : "สแกนหรือกรอก HN / รหัสผู้ป่วย (13 หลัก)"
            }
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <FileSearch size={18} />
          </button>
        </div>

        {foundPatient ? (
          <div className={styles.resultBox}>
            <p>
              {language === "en" ? "Patient" : "ผู้ป่วย"}:{" "}
              <strong>
                {foundPatient.firstName} {foundPatient.lastName}
              </strong>
            </p>
            <div className={styles.qrBox}>
              <QRCode value={foundPatient.idCard} size={100} />
              <p>HN: {foundPatient.idCard}</p>
            </div>

            {!rejected ? (
              <div className={styles.actions}>
                <button
                  className={styles.acceptBtn}
                  onClick={handleAccept}
                >
                  <Check size={16} style={{ marginRight: 4 }} />
                  {language === "en" ? "Accept Specimen" : "รับสิ่งส่งตรวจ"}
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => setRejected(true)}
                >
                  <X size={16} style={{ marginRight: 4 }} />
                  {language === "en"
                    ? "Reject Specimen"
                    : "ปฏิเสธสิ่งส่งตรวจ"}
                </button>
              </div>
            ) : (
              <div className={styles.rejectBox}>
                <input
                  className={styles.input}
                  placeholder={
                    language === "en"
                      ? "Enter rejection reason"
                      : "ระบุเหตุผลการปฏิเสธ"
                  }
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className={styles.actions}>
                  <button
                    className={styles.rejectBtn}
                    onClick={handleReject}
                  >
                    <X size={16} /> {language === "en" ? "Confirm Reject" : "ยืนยันการปฏิเสธ"}
                  </button>
                  <button
                    className={styles.acceptBtn}
                    onClick={() => setRejected(false)}
                  >
                    {language === "en" ? "Cancel" : "ยกเลิก"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          searchId && (
            <p className={styles.noResult}>
              {language === "en"
                ? "No matching patient found."
                : "ไม่พบข้อมูลผู้ป่วยในระบบ"}
            </p>
          )
        )}
      </div>
    </div>
  );
}

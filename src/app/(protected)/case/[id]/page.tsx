"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, QrCode, FileText, Activity, FileDown } from "lucide-react";
import QRCode from "react-qr-code";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

interface Patient {
  idCard: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string;
  phone: string;
  ethnicity: string;
  otherEthnicity?: string;
  status: string;
  gene?: string;
  genotype?: string;
  phenotype?: string;
  recommendation?: string;
}

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    const found = stored.find((p: Patient) => p.idCard === id);
    if (found) setPatient(found);
  }, [id]);

  if (!patient)
    return (
      <div className={styles.container}>
        <p>
          {language === "en" ? "No patient found." : "ไม่พบข้อมูลผู้ป่วย"}
        </p>
        <button onClick={() => router.push("/case")} className={styles.button}>
          {language === "en" ? "Back to list" : "กลับไปหน้ารายการ"}
        </button>
      </div>
    );

  const handleGeneratePDF = () => {
    alert(
      language === "en"
        ? "📄 PDF report generated (mock)."
        : "📄 สร้างรายงานผลเรียบร้อย (ตัวอย่าง)"
    );
  };

  const handleConsent = () => {
    alert(
      language === "en"
        ? "e-Consent management opened (mock)."
        : "เปิดหน้าจัดการ e-Consent (จำลอง)"
    );
  };

  const handleLog = () => {
    alert(
      language === "en"
        ? "Access logs viewed (mock)."
        : "ดูประวัติการเข้าถึงข้อมูล (จำลอง)"
    );
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.push("/case")}>
        <ArrowLeft size={18} />{" "}
        {language === "en" ? "Back" : "กลับไปหน้ารายการ"}
      </button>

      <h1 className={styles.title}>
        {language === "en" ? "Patient Detail" : "รายละเอียดผู้ป่วย"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "Patient information and genetic results"
          : "ข้อมูลผู้ป่วยและผลการตรวจพันธุกรรม"}
      </p>

      {/* Patient Info */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {language === "en" ? "Patient Information" : "ข้อมูลผู้ป่วย"}
        </h2>
        <ul className={styles.infoList}>
          <li>
            <strong>HN:</strong> {patient.idCard}
          </li>
          <li>
            <strong>{language === "en" ? "Name" : "ชื่อ"}:</strong>{" "}
            {patient.firstName} {patient.lastName}
          </li>
          <li>
            <strong>{language === "en" ? "Sex" : "เพศ"}:</strong>{" "}
            {patient.sex === "male"
              ? language === "en"
                ? "Male"
                : "ชาย"
              : language === "en"
              ? "Female"
              : "หญิง"}
          </li>
          <li>
            <strong>{language === "en" ? "DOB" : "วันเกิด"}:</strong>{" "}
            {patient.dob}
          </li>
          <li>
            <strong>{language === "en" ? "Phone" : "เบอร์โทร"}:</strong>{" "}
            {patient.phone}
          </li>
          <li>
            <strong>{language === "en" ? "Ethnicity" : "สัญชาติ"}:</strong>{" "}
            {patient.ethnicity === "thai"
              ? language === "en"
                ? "Thai"
                : "ไทย"
              : patient.otherEthnicity || "-"}
          </li>
        </ul>
      </div>

      {/* QR / Barcode */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <QrCode size={18} color="#4ca771" />{" "}
          {language === "en" ? "Barcode / QR Label" : "พิมพ์ฉลากบาร์โค้ด / QR"}
        </h2>
        <div className={styles.qrBox}>
          <QRCode value={patient.idCard} size={120} />
          <p>HN: {patient.idCard}</p>
        </div>
      </div>

      {/* Genetic Result */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FileText size={18} color="#4ca771" />{" "}
          {language === "en" ? "Genetic Result" : "ผลการตรวจพันธุกรรม"}
        </h2>
        {patient.gene ? (
          <ul className={styles.infoList}>
            <li>
              <strong>Gene:</strong> {patient.gene}
            </li>
            <li>
              <strong>Genotype:</strong> {patient.genotype || "-"}
            </li>
            <li>
              <strong>Phenotype:</strong> {patient.phenotype || "-"}
            </li>
            <li>
              <strong>
                {language === "en" ? "Recommendation" : "คำแนะนำ"}:
              </strong>{" "}
              {patient.recommendation || "-"}
            </li>
          </ul>
        ) : (
          <p>
            {language === "en"
              ? "No genetic result yet."
              : "ยังไม่มีผลการตรวจพันธุกรรม"}
          </p>
        )}
      </div>

      {/* CDS & Recommendation */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {language === "en"
            ? "Clinical Decision Support (CDS)"
            : "โมดูลแปลผลและคำแนะนำ (CDS)"}
        </h2>
        <p className={styles.sectionNote}>
          {language === "en"
            ? "System-generated recommendations will appear here after gene entry."
            : "คำแนะนำจากระบบจะปรากฏหลังจากกรอกข้อมูลยีน"}
        </p>
      </div>

      {/* TDM Module */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Activity size={18} color="#4ca771" />{" "}
          {language === "en"
            ? "Therapeutic Drug Monitoring (TDM)"
            : "โมดูลติดตามระดับยา (TDM)"}
        </h2>
        <p>
          {language === "en"
            ? "Record values such as Warfarin INR or TPMT enzyme (mock)."
            : "บันทึกค่าการตรวจเช่น Warfarin INR หรือ TPMT enzyme (จำลอง)"}
        </p>
      </div>

      {/* PDF / Consent / Log */}
      <div className={styles.actionsGroup}>
        <button className={styles.button} onClick={handleGeneratePDF}>
          <FileDown size={18} style={{ marginRight: 6 }} />
          {language === "en" ? "Generate PDF Report" : "สร้างรายงาน (PDF)"}
        </button>

        <button className={styles.secondaryBtn} onClick={handleConsent}>
          {language === "en" ? "Manage e-Consent" : "จัดการ e-Consent"}
        </button>

        <button className={styles.secondaryBtn} onClick={handleLog}>
          {language === "en" ? "View Access Log" : "ดูประวัติการเข้าถึง"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { BarChart2, PieChart, FileDown, ActivitySquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Pie, PieChart as RePieChart, Cell } from "recharts";

export default function ReportsPage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState("dashboard");

  // ✅ Mock patient data
  const [patients, setPatients] = useState<any[]>([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(stored);
  }, []);

  // ✅ Summary Counts
  const total = patients.length;
  const pendingGene = patients.filter((p) => p.status === "pending_gene").length;
  const pendingApprove = patients.filter((p) => p.status === "pending_approve").length;
  const approved = patients.filter((p) => p.status === "approved").length;

  // ✅ KPI Mock data
  const kpiData = [
    { name: language === "en" ? "Rejection Rate" : "อัตราการปฏิเสธ", value: 2.4 },
    { name: language === "en" ? "Repeat Rate" : "อัตราการตรวจซ้ำ", value: 1.3 },
    { name: language === "en" ? "ADR Incidence" : "อัตราการเกิด ADR", value: 0.8 },
  ];

  const adoptionData = [
    { name: language === "en" ? "Participating Units" : "หน่วยบริการที่เข้าร่วม", value: 12 },
    { name: language === "en" ? "Trained Personnel" : "บุคลากรผ่านอบรม", value: 56 },
  ];

  // ✅ TAT mock (pre/analytic/post)
  const tatData = [
    { stage: "Pre-analytic", avg: 1.2 },
    { stage: "Analytic", avg: 2.8 },
    { stage: "Post-analytic", avg: 0.9 },
  ];

  const COLORS = ["#4CA771", "#F4B400", "#E55353"];

  const handleExport = (type: string) => {
    alert(
      language === "en"
        ? `📁 Exported ${type} report (mock).`
        : `📁 ส่งออกสถิติ${type}แล้ว (จำลอง)`
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en" ? "Reports & Analytics" : "รายงานและสถิติ (Reports & Analytics)"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "Executive dashboard and quality indicators"
          : "แดชบอร์ดสรุปผู้บริหารและตัวชี้วัดคุณภาพ"}
      </p>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button className={`${styles.tabBtn} ${tab === "dashboard" ? styles.active : ""}`} onClick={() => setTab("dashboard")}>
          📈 {language === "en" ? "Executive Dashboard" : "แดชบอร์ดสรุปผู้บริหาร"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "export" ? styles.active : ""}`} onClick={() => setTab("export")}>
          📊 {language === "en" ? "Export Statistics" : "ส่งออกสถิติ"}
        </button>
      </div>

      {/* ---------- DASHBOARD ---------- */}
      {tab === "dashboard" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "Case Summary" : "สรุปจำนวนเคสทั้งหมด"}
          </h2>

          <div className={styles.cards}>
            <div className={styles.card}>
              <p>{language === "en" ? "Total Cases" : "เคสทั้งหมด"}</p>
              <h3>{total}</h3>
            </div>
            <div className={`${styles.card} ${styles.yellow}`}>
              <p>{language === "en" ? "Pending Gene Entry" : "รอกรอกยีน"}</p>
              <h3>{pendingGene}</h3>
            </div>
            <div className={`${styles.card} ${styles.orange}`}>
              <p>{language === "en" ? "Pending Approval" : "รออนุมัติ"}</p>
              <h3>{pendingApprove}</h3>
            </div>
            <div className={`${styles.card} ${styles.green}`}>
              <p>{language === "en" ? "Approved" : "อนุมัติแล้ว"}</p>
              <h3>{approved}</h3>
            </div>
          </div>

          {/* TAT Bar Chart */}
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "TAT Monitoring (days)" : "รายงานติดตาม TAT (วัน)"}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={tatData}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill="#4CA771" />
            </BarChart>
          </ResponsiveContainer>

          {/* KPI Pie Chart */}
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "Quality KPI Overview" : "สรุปตัวชี้วัดคุณภาพ"}
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <RePieChart>
              <Pie data={kpiData} dataKey="value" nameKey="name" outerRadius={110} label>
                {kpiData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ---------- EXPORT ---------- */}
      {tab === "export" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "Export Reports" : "ส่งออกสถิติ"}
          </h2>
          <p>{language === "en" ? "Generate monthly or annual reports" : "ส่งออกข้อมูลรายเดือน / รายปี"}</p>

          <div className={styles.exportBtns}>
            <button className={styles.button} onClick={() => handleExport("monthly")}>
              <FileDown size={18} /> {language === "en" ? "Export Monthly" : "ส่งออกรายเดือน"}
            </button>
            <button className={styles.button} onClick={() => handleExport("annual")}>
              <FileDown size={18} /> {language === "en" ? "Export Annual" : "ส่งออกรายปี"}
            </button>
          </div>

          {/* KPI Table */}
          <div className={styles.tableBox}>
            <h3 className={styles.sectionSub}>
              {language === "en" ? "Quality Indicators" : "ตัวชี้วัดคุณภาพ (KPI)"}
            </h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{language === "en" ? "Indicator" : "ตัวชี้วัด"}</th>
                  <th>{language === "en" ? "Value" : "ค่า (%)"}</th>
                </tr>
              </thead>
              <tbody>
                {kpiData.map((k, i) => (
                  <tr key={i}>
                    <td>{k.name}</td>
                    <td>{k.value}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Adoption Metrics */}
          <div className={styles.tableBox}>
            <h3 className={styles.sectionSub}>
              {language === "en" ? "Adoption Metrics" : "รายงานการนำไปใช้"}
            </h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{language === "en" ? "Metric" : "ตัวชี้วัด"}</th>
                  <th>{language === "en" ? "Value" : "จำนวน"}</th>
                </tr>
              </thead>
              <tbody>
                {adoptionData.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name}</td>
                    <td>{a.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

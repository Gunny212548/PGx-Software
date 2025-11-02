"use client";

import { useState } from "react";
import { Shield, BarChart2, PieChart, Download, FileText } from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart as RPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./page.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function ReportsPage() {
  const { language } = useLanguage();
  const lang = language === "en" ? "en" : "th";

  /* mock data */
  const [month, setMonth] = useState("October");
  const [year, setYear] = useState("2025");

  const summaryCards = [
    { label: lang === "en" ? "Cases (Today)" : "จำนวนเคสวันนี้", value: 42 },
    { label: lang === "en" ? "This Week" : "สัปดาห์นี้", value: 268 },
    { label: lang === "en" ? "This Month" : "เดือนนี้", value: 1034 },
    { label: lang === "en" ? "Total Tests" : "รายการตรวจทั้งหมด", value: 18 },
  ];

  const barData = [
    { name: "Week 1", cases: 180 },
    { name: "Week 2", cases: 210 },
    { name: "Week 3", cases: 160 },
    { name: "Week 4", cases: 240 },
  ];

  const tatData = [
    { name: "Pre-Analytic", value: 45 },
    { name: "Analytic", value: 35 },
    { name: "Post-Analytic", value: 20 },
  ];
  const COLORS = ["#4ca771", "#81c784", "#c8e6c9"];

  const kpi = [
    { name: lang === "en" ? "Rejection Rate" : "อัตราการปฏิเสธสิ่งส่งตรวจ", value: "2.5%" },
    { name: lang === "en" ? "Repeat Rate" : "อัตราการตรวจซ้ำ", value: "1.2%" },
    { name: lang === "en" ? "ADR Incidence" : "อัตราการเกิด ADR", value: "0.8%" },
  ];

  const adoption = [
    { label: lang === "en" ? "Participating Sites" : "หน่วยบริการที่เข้าร่วม", value: 18 },
    { label: lang === "en" ? "Trained Staff" : "บุคลากรที่ผ่านการอบรม", value: 145 },
  ];

  const handleExport = (type: "CSV" | "PDF") => {
    alert(
      lang === "en"
        ? `Exporting ${type} for ${month} ${year} (mock)`
        : `ส่งออกไฟล์ ${type} สำหรับ ${month} ${year} (จำลอง)`
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {lang === "en"
          ? "Reports & Analytics"
          : "รายงานและสถิติ (Reports & Analytics)"}
      </h1>
      <p className={styles.subtitle}>
        {lang === "en"
          ? "Executive dashboard and key performance metrics."
          : "แดชบอร์ดสรุปผู้บริหารและตัวชี้วัดคุณภาพหลัก"}
      </p>

      {/* Executive Summary */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <BarChart2 size={18} />{" "}
          {lang === "en" ? "Executive Dashboard" : "แดชบอร์ดสรุปผู้บริหาร"}
        </h2>

        <div className={styles.cardGrid}>
          {summaryCards.map((c, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardLabel}>{c.label}</div>
              <div className={styles.cardValue}>{c.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.chartRow}>
          {/* Bar chart */}
          <RBarChart width={400} height={220} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cases" fill="#4ca771" radius={[4, 4, 0, 0]} />
          </RBarChart>

          {/* Pie chart */}
          <RPieChart width={350} height={220}>
            <Pie
              data={tatData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label
            >
              {tatData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </RPieChart>
        </div>
      </div>

      {/* Export Statistics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FileText size={18} />{" "}
          {lang === "en" ? "Export Statistics" : "ระบบ Export สถิติ"}
        </h2>
        <div className={styles.exportBar}>
          <select
            className={styles.select}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            className={styles.select}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {["2024","2025","2026"].map(y => <option key={y}>{y}</option>)}
          </select>

          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => handleExport("CSV")}
          >
            <Download size={16} /> CSV
          </button>
          <button
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={() => handleExport("PDF")}
          >
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

      {/* KPI Table */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {lang === "en" ? "Quality KPIs" : "ตัวชี้วัดคุณภาพ (KPI)"}
        </h2>
        <div className={styles.tableBox}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{lang === "en" ? "Metric" : "ตัวชี้วัด"}</th>
                <th>{lang === "en" ? "Value" : "ค่า (%)"}</th>
              </tr>
            </thead>
            <tbody>
              {kpi.map((k, i) => (
                <tr key={i}>
                  <td>{k.name}</td>
                  <td>{k.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adoption Metrics */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {lang === "en" ? "Adoption Metrics" : "รายงานการนำไปใช้ (Adoption Metrics)"}
        </h2>
        <div className={styles.cardGrid}>
          {adoption.map((a, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardLabel}>{a.label}</div>
              <div className={styles.cardValue}>{a.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

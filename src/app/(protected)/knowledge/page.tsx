"use client";

import { useState } from "react";
import { FileDown, Dna, BookOpenText, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function KnowledgePage() {
  const { language } = useLanguage();
  const [tab, setTab] = useState("testinfo");

  const handleDownload = () => {
    alert(
      language === "en"
        ? "📄 Test request form downloaded (mock)."
        : "📄 ดาวน์โหลดใบสั่งตรวจแล้ว (จำลอง)"
    );
  };

  const cdsRules = [
    {
      gene: "CYP2C19",
      genotype: "*1/*2",
      phenotype: "Intermediate metabolizer",
      drug: "Clopidogrel",
      recommendation:
        language === "en"
          ? "Consider alternative antiplatelet (e.g., prasugrel)."
          : "พิจารณาใช้ยาต้านเกล็ดเลือดตัวอื่น (เช่น prasugrel)",
      ref: "CPIC 2023, PharmGKB v5.2",
    },
    {
      gene: "CYP2D6",
      genotype: "*4/*4",
      phenotype: "Poor metabolizer",
      drug: "Codeine",
      recommendation:
        language === "en"
          ? "Avoid codeine; consider morphine."
          : "หลีกเลี่ยงการใช้ codeine; พิจารณาใช้ morphine",
      ref: "CPIC 2022",
    },
    {
      gene: "HLA-B*15:02",
      genotype: "Positive",
      phenotype: "High risk for SJS/TEN",
      drug: "Carbamazepine",
      recommendation:
        language === "en"
          ? "Avoid carbamazepine due to severe cutaneous reaction risk."
          : "ห้ามใช้ carbamazepine เนื่องจากเสี่ยงต่อ SJS/TEN",
      ref: "CPIC 2021",
    },
  ];

  const articles = [
    {
      title:
        language === "en"
          ? "Implementation of PGx Testing in Clinical Practice"
          : "การประยุกต์ใช้การตรวจ PGx ในเวชปฏิบัติจริง",
      source: "Nature Pharmacogenomics (2023)",
    },
    {
      title:
        language === "en"
          ? "HLA-B*15:02 and Drug-Induced Hypersensitivity"
          : "HLA-B*15:02 กับภาวะภูมิไวต่อยา",
      source: "PharmGKB Insights (2022)",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en"
          ? "Knowledge & Information"
          : "คลังข้อมูลและความรู้"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "Reference materials, CDS rules, and PGx resources"
          : "แหล่งอ้างอิง กฎการแปลผล และข้อมูลวิจัยทาง PGx"}
      </p>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabBtn} ${
            tab === "testinfo" ? styles.active : ""
          }`}
          onClick={() => setTab("testinfo")}
        >
          🧾 {language === "en" ? "Test Information" : "ข้อมูลบริการตรวจ"}
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "cds" ? styles.active : ""}`}
          onClick={() => setTab("cds")}
        >
          🧬 {language === "en" ? "CDS Rules" : "กฎการแปลผล (CDS)"}
        </button>
        <button
          className={`${styles.tabBtn} ${tab === "articles" ? styles.active : ""}`}
          onClick={() => setTab("articles")}
        >
          📚 {language === "en" ? "Articles & Research" : "บทความและงานวิจัย"}
        </button>
      </div>

      {/* ---------- TEST INFORMATION ---------- */}
      {tab === "testinfo" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "PGx Test Information" : "ข้อมูลบริการตรวจ PGx"}
          </h2>
          <p>
            {language === "en"
              ? "Download request form and check turnaround time (TAT)"
              : "ดาวน์โหลดใบสั่งตรวจและตรวจสอบระยะเวลาให้บริการ (TAT)"}
          </p>

          <button className={styles.button} onClick={handleDownload}>
            <FileDown size={18} style={{ marginRight: 6 }} />
            {language === "en"
              ? "Download Request Form (PDF)"
              : "ดาวน์โหลดใบสั่งตรวจ (PDF)"}
          </button>

          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>TAT (Days)</th>
                  <th>{language === "en" ? "Specimen Type" : "ชนิดสิ่งส่งตรวจ"}</th>
                  <th>{language === "en" ? "Volume" : "ปริมาณขั้นต่ำ"}</th>
                  <th>{language === "en" ? "Pre-test Instruction" : "ข้อปฏิบัติก่อนตรวจ"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CYP2C19 / CYP2D6 Panel</td>
                  <td>5</td>
                  <td>{language === "en" ? "Whole blood (EDTA)" : "เลือด (EDTA)"}</td>
                  <td>2 mL</td>
                  <td>
                    {language === "en"
                      ? "No fasting required"
                      : "ไม่จำเป็นต้องงดอาหาร"}
                  </td>
                </tr>
                <tr>
                  <td>HLA-B*15:02 Screening</td>
                  <td>3</td>
                  <td>{language === "en" ? "Buccal swab" : "Swab กระพุ้งแก้ม"}</td>
                  <td>2 swabs</td>
                  <td>
                    {language === "en"
                      ? "Avoid eating/drinking 30 min before collection"
                      : "งดอาหาร/น้ำอย่างน้อย 30 นาที ก่อนเก็บตัวอย่าง"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- CDS RULES ---------- */}
      {tab === "cds" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en"
              ? "Clinical Decision Support (CDS) Rules"
              : "กฎการแปลผลและคำแนะนำทางคลินิก (CDS)"}
          </h2>

          <div className={styles.searchBar}>
            <Search size={18} />
            <input
              type="text"
              placeholder={
                language === "en" ? "Search gene / drug..." : "ค้นหายีนหรือยา..."
              }
              className={styles.searchInput}
            />
          </div>

          <div className={styles.tableBox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Gene</th>
                  <th>Genotype</th>
                  <th>Phenotype</th>
                  <th>Drug</th>
                  <th>{language === "en" ? "Recommendation" : "คำแนะนำ"}</th>
                  <th>{language === "en" ? "Reference" : "อ้างอิง"}</th>
                </tr>
              </thead>
              <tbody>
                {cdsRules.map((r, i) => (
                  <tr key={i}>
                    <td>{r.gene}</td>
                    <td>{r.genotype}</td>
                    <td>{r.phenotype}</td>
                    <td>{r.drug}</td>
                    <td>{r.recommendation}</td>
                    <td>{r.ref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- ARTICLES ---------- */}
      {tab === "articles" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en"
              ? "Articles & Research"
              : "บทความและงานวิจัย"}
          </h2>

          {articles.map((a, i) => (
            <div key={i} className={styles.articleCard}>
              <BookOpenText size={18} color="#4ca771" />
              <div>
                <p className={styles.articleTitle}>{a.title}</p>
                <p className={styles.articleSource}>{a.source}</p>
              </div>
              <button className={styles.readBtn}>
                {language === "en" ? "Read more" : "อ่านเพิ่มเติม"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

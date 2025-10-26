"use client";

import { useState } from "react";
import { Users, Shield, Network, Settings, FileText, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function AdminPanel() {
  const { language } = useLanguage();
  const [tab, setTab] = useState("users");

  // Mock users
  const [users, setUsers] = useState([
    { name: "Dr. Alice", role: "Admin", department: "Pharmacogenomics" },
    { name: "Tech. Bob", role: "Technician", department: "Molecular Lab" },
    { name: "Pharm. Carol", role: "Pharmacist", department: "Clinical Pharmacy" },
  ]);

  const [logs] = useState([
    { user: "Admin", action: "Edited Patient Record", time: "2025-10-26 13:32" },
    { user: "Tech. Bob", action: "Uploaded QC File", time: "2025-10-25 10:21" },
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en" ? "Admin Panel" : "การตั้งค่าระบบ (Admin Panel)"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "Manage users, PDPA, integration, and system settings"
          : "จัดการผู้ใช้งาน, PDPA, การเชื่อมต่อ และการตั้งค่าระบบ"}
      </p>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button className={`${styles.tabBtn} ${tab === "users" ? styles.active : ""}`} onClick={() => setTab("users")}>
          👥 {language === "en" ? "User Management" : "การจัดการผู้ใช้งาน"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "pdpa" ? styles.active : ""}`} onClick={() => setTab("pdpa")}>
          🧾 PDPA
        </button>
        <button className={`${styles.tabBtn} ${tab === "integration" ? styles.active : ""}`} onClick={() => setTab("integration")}>
          🔗 {language === "en" ? "Integration" : "การเชื่อมต่อระบบ"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "system" ? styles.active : ""}`} onClick={() => setTab("system")}>
          ⚙️ {language === "en" ? "System Settings" : "การตั้งค่าทั่วไป"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "license" ? styles.active : ""}`} onClick={() => setTab("license")}>
          📜 {language === "en" ? "License & TT" : "สิทธิ์การใช้งาน & TT"}
        </button>
        <button className={`${styles.tabBtn} ${tab === "log" ? styles.active : ""}`} onClick={() => setTab("log")}>
          🧠 Audit Log
        </button>
      </div>

      {/* ---------- USER MANAGEMENT ---------- */}
      {tab === "users" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {language === "en" ? "User Management" : "การจัดการผู้ใช้งาน"}
          </h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{language === "en" ? "Name" : "ชื่อ"}</th>
                <th>{language === "en" ? "Role" : "สิทธิ์"}</th>
                <th>{language === "en" ? "Department" : "หน่วยงาน"}</th>
                <th>{language === "en" ? "Actions" : "จัดการ"}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>{u.department}</td>
                  <td>
                    <button className={styles.smallBtn}>
                      {language === "en" ? "Edit" : "แก้ไข"}
                    </button>
                    <button className={styles.smallBtnDel}>
                      {language === "en" ? "Delete" : "ลบ"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- PDPA ---------- */}
      {tab === "pdpa" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>PDPA Management</h2>
          <p>{language === "en" ? "Manage consent templates, retention, and DPIA" : "ตั้งค่า Consent, Retention Policy และ DPIA"}</p>

          <div className={styles.form}>
            <label>{language === "en" ? "Data Retention (years)" : "ระยะเวลาเก็บข้อมูล (ปี)"}</label>
            <input className={styles.input} type="number" placeholder="5" />

            <label>{language === "en" ? "Enable Dynamic e-Consent" : "เปิดใช้งาน e-Consent แบบไดนามิก"}</label>
            <select className={styles.input}>
              <option>ON</option>
              <option>OFF</option>
            </select>

            <label>{language === "en" ? "Default Purpose" : "วัตถุประสงค์การใช้ข้อมูล"}</label>
            <select className={styles.input}>
              <option>Clinical</option>
              <option>Research</option>
            </select>

            <button className={styles.button}>
              {language === "en" ? "Save PDPA Settings" : "บันทึกการตั้งค่า PDPA"}
            </button>
          </div>
        </div>
      )}

      {/* ---------- INTEGRATION ---------- */}
      {tab === "integration" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "Integration Settings" : "การเชื่อมต่อระบบ"}</h2>
          <p>{language === "en" ? "Configure system interfaces and APIs" : "ตั้งค่าการเชื่อมต่อ HIS, Analyzer และ API"}</p>

          <div className={styles.form}>
            <label>HIS / EMR Endpoint</label>
            <input className={styles.input} placeholder="https://his.example.com/fhir" />

            <label>Analyzer Interface (ASTM/HL7)</label>
            <input className={styles.input} placeholder="192.168.1.100:5000" />

            <label>External API Token</label>
            <input className={styles.input} placeholder="xxxxxxxxxxxx" />

            <button className={styles.button}>
              {language === "en" ? "Save Integration Settings" : "บันทึกการเชื่อมต่อ"}
            </button>
          </div>
        </div>
      )}

      {/* ---------- SYSTEM SETTINGS ---------- */}
      {tab === "system" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "System Settings" : "การตั้งค่าทั่วไป"}</h2>
          <div className={styles.form}>
            <label>{language === "en" ? "System Name" : "ชื่อระบบ"}</label>
            <input className={styles.input} placeholder="PGx Digital Platform" />

            <label>{language === "en" ? "Upload Logo" : "อัปโหลดโลโก้"}</label>
            <input className={styles.input} type="file" />

            <label>{language === "en" ? "Default Language" : "ภาษาหลัก"}</label>
            <select className={styles.input}>
              <option>English</option>
              <option>ไทย</option>
            </select>

            <button className={styles.button}>
              {language === "en" ? "Save Settings" : "บันทึกการตั้งค่า"}
            </button>
          </div>
        </div>
      )}

      {/* ---------- LICENSE ---------- */}
      {tab === "license" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "License & Technology Transfer" : "สิทธิ์การใช้งานและการถ่ายทอดเทคโนโลยี"}</h2>
          <p>{language === "en" ? "Manage software license and TT module" : "จัดการสิทธิ์การใช้งานและโมดูลสนับสนุน TT"}</p>

          <div className={styles.licenseBox}>
            <p><strong>License Key:</strong> PGX-2025-THA-001</p>
            <p><strong>Status:</strong> Active (Valid until 2026-12-31)</p>
            <button className={styles.button}>{language === "en" ? "Renew License" : "ต่ออายุสิทธิ์การใช้งาน"}</button>
          </div>
        </div>
      )}

      {/* ---------- AUDIT LOG ---------- */}
      {tab === "log" && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{language === "en" ? "Audit Log" : "บันทึกการใช้งานระบบ"}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>{language === "en" ? "Timestamp" : "วันเวลา"}</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i}>
                  <td>{l.user}</td>
                  <td>{l.action}</td>
                  <td>{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

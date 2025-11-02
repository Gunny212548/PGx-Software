"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Trash2, Plus } from "lucide-react";
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
}

export default function CaseListPage() {
  const { language } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(stored);
  }, []);

  const filtered =
    filter === "all"
      ? patients
      : patients.filter((p) => p.status === filter);

  const handleDelete = (idCard: string) => {
    if (
      !confirm(
        language === "en"
          ? "Do you want to delete this patient?"
          : "ต้องการลบข้อมูลผู้ป่วยนี้หรือไม่?"
      )
    )
      return;

    const updated = patients.filter((p) => p.idCard !== idCard);
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {language === "en" ? "Patient Cases" : "รายการผู้ป่วย / เคส"}
      </h1>
      <p className={styles.subtitle}>
        {language === "en"
          ? "List of all patient records with TAT status"
          : "แสดงข้อมูลผู้ป่วยทั้งหมดพร้อมสถานะ TAT"}
      </p>

      <div className={styles.topBar}>
        <div className={styles.leftButtons}>
          <Link href="/case/add" className={styles.button}>
            <Plus size={18} style={{ marginRight: 6 }} />
            {language === "en" ? "Add New Case" : "เพิ่มเคสใหม่"}
          </Link>

          <Link href="/gene" className={styles.secondaryBtn}>
            {language === "en" ? "Gene Entry" : "กรอกข้อมูลยีน"}
          </Link>

          <Link href="/approve" className={styles.secondaryBtn}>
            {language === "en" ? "Approval" : "อนุมัติผล"}
          </Link>
        </div>

        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">{language === "en" ? "All" : "ทั้งหมด"}</option>
          <option value="pending_gene">
            {language === "en" ? "Pending Gene Entry" : "รอกรอกยีน"}
          </option>
          <option value="pending_approve">
            {language === "en" ? "Pending Approval" : "รออนุมัติ"}
          </option>
          <option value="approved">
            {language === "en" ? "Approved" : "อนุมัติแล้ว"}
          </option>
        </select>
      </div>

      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>HN</th>
              <th>{language === "en" ? "Name" : "ชื่อ-นามสกุล"}</th>
              <th>{language === "en" ? "Phone" : "เบอร์โทร"}</th>
              <th>{language === "en" ? "Sex" : "เพศ"}</th>
              <th>{language === "en" ? "DOB" : "วันเกิด"}</th>
              <th>{language === "en" ? "Ethnicity" : "สัญชาติ"}</th>
              <th>{language === "en" ? "Status" : "สถานะ"}</th>
              <th>{language === "en" ? "Actions" : "จัดการ"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  {language === "en"
                    ? "No patient data found."
                    : "ไม่พบข้อมูลผู้ป่วย"}
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.idCard}>
                  <td>{p.idCard}</td>
                  <td>
                    {p.firstName} {p.lastName}
                  </td>
                  <td>{p.phone}</td>
                  <td>
                    {p.sex === "male"
                      ? language === "en"
                        ? "Male"
                        : "ชาย"
                      : language === "en"
                      ? "Female"
                      : "หญิง"}
                  </td>
                  <td>{p.dob}</td>
                  <td>
                    {p.ethnicity === "thai"
                      ? language === "en"
                        ? "Thai"
                        : "ไทย"
                      : p.otherEthnicity || "-"}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        p.status === "pending_gene"
                          ? styles.pending
                          : p.status === "pending_approve"
                          ? styles.review
                          : styles.approved
                      }`}
                    >
                      {language === "en"
                        ? p.status?.replace("_", " ") || "Unknown"
                        : p.status === "pending_gene"
                        ? "รอกรอกยีน"
                        : p.status === "pending_approve"
                        ? "รออนุมัติ"
                        : p.status === "approved"
                        ? "อนุมัติแล้ว"
                        : "ไม่ทราบสถานะ"}
                    </span>
                  </td>
                  <td className={styles.rowActions}>
                    <Link
                      href={`/case/${p.idCard}`}
                      className={styles.viewBtn}
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.idCard)}
                      className={styles.deleteBtn}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./page.module.css";

export default function AddCasePage() {
  const { language } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    idCard: "",
    firstName: "",
    lastName: "",
    sex: "",
    dob: "",
    phone: "",
    ethnicity: "",
    otherEthnicity: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  // 🔄 Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "idCard") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 13);
      setForm((prev) => ({ ...prev, idCard: onlyNums }));
      setErrors((prev) => ({ ...prev, idCard: "" }));
      return;
    }

    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, phone: onlyNums }));
      setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRadio = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Validate
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!/^\d{13}$/.test(form.idCard))
      newErrors.idCard =
        language === "en"
          ? "HN must be 13 digits"
          : "HN ต้องมี 13 หลัก";

    if (!form.firstName)
      newErrors.firstName =
        language === "en" ? "First name is required" : "กรุณากรอกชื่อ";

    if (!form.lastName)
      newErrors.lastName =
        language === "en" ? "Last name is required" : "กรุณากรอกนามสกุล";

    if (!form.sex)
      newErrors.sex =
        language === "en" ? "Please select sex" : "กรุณาเลือกเพศ";

    if (!form.dob) {
      newErrors.dob =
        language === "en"
          ? "Please select date of birth"
          : "กรุณาเลือกวันเดือนปีเกิด";
    } else if (new Date(form.dob) >= new Date()) {
      newErrors.dob =
        language === "en"
          ? "Date of birth cannot be today or in the future"
          : "วันเกิดต้องไม่เป็นวันที่ปัจจุบันหรืออนาคต";
    }

    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone =
        language === "en"
          ? "Phone must be 10 digits"
          : "เบอร์โทรศัพท์ต้องมี 10 หลัก";

    if (!form.ethnicity) {
      newErrors.ethnicity =
        language === "en"
          ? "Please select ethnicity"
          : "กรุณาเลือกสัญชาติ";
    } else if (form.ethnicity === "other" && !form.otherEthnicity) {
      newErrors.otherEthnicity =
        language === "en"
          ? "Please specify ethnicity"
          : "กรุณาระบุสัญชาติอื่น ๆ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💾 Save form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    const newPatient = {
      ...form,
      status: "pending_gene",
    };
    localStorage.setItem("patients", JSON.stringify([newPatient, ...patients]));

    alert(
      language === "en"
        ? "✅ Patient data saved successfully!"
        : "✅ บันทึกข้อมูลผู้ป่วยเรียบร้อยแล้ว!"
    );

    setForm({
      idCard: "",
      firstName: "",
      lastName: "",
      sex: "",
      dob: "",
      phone: "",
      ethnicity: "",
      otherEthnicity: "",
    });

    // redirect back
    router.push("/case");
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {language === "en" ? "Add New Case" : "เพิ่มเคสใหม่"}
        </h1>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => router.push("/case")}
        >
          <X size={22} />
        </button>
      </div>

      <p className={styles.subtitle}>
        {language === "en"
          ? "Enter patient demographic information."
          : "กรอกข้อมูลประวัติผู้ป่วย"}
      </p>

      <div className={styles.section}>
        {/* HN */}
        <div className={styles.field}>
          <label className={styles.label}>
            {language === "en" ? "HN" : "หมายเลข HN"}
          </label>
          <input
            className={`${styles.input} ${
              errors.idCard ? styles.errorInput : ""
            }`}
            name="idCard"
            value={form.idCard}
            onChange={handleChange}
            placeholder={
              language === "en"
                ? "Enter 13-digit HN"
                : "กรอกหมายเลข HN (13 หลัก)"
            }
          />
          {errors.idCard && (
            <span className={styles.error}>{errors.idCard}</span>
          )}
        </div>

        {/* First / Last Name */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              {language === "en" ? "First Name" : "ชื่อ"}
            </label>
            <input
              name="firstName"
              className={`${styles.input} ${
                errors.firstName ? styles.errorInput : ""
              }`}
              value={form.firstName}
              onChange={handleChange}
              placeholder={language === "en" ? "First Name" : "ชื่อ"}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              {language === "en" ? "Last Name" : "นามสกุล"}
            </label>
            <input
              name="lastName"
              className={`${styles.input} ${
                errors.lastName ? styles.errorInput : ""
              }`}
              value={form.lastName}
              onChange={handleChange}
              placeholder={language === "en" ? "Last Name" : "นามสกุล"}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* DOB + Sex */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              {language === "en" ? "Date of Birth" : "วันเดือนปีเกิด"}
            </label>
            <input
              type="date"
              name="dob"
              className={`${styles.input} ${styles.dateInput} ${
                errors.dob ? styles.errorInput : ""
              }`}
              value={form.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dob && <span className={styles.error}>{errors.dob}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              {language === "en" ? "Sex" : "เพศ"}
            </label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="sex"
                  checked={form.sex === "male"}
                  onChange={() => handleRadio("sex", "male")}
                />
                {language === "en" ? "Male" : "ชาย"}
              </label>
              <label>
                <input
                  type="radio"
                  className={styles.radioInput}
                  name="sex"
                  checked={form.sex === "female"}
                  onChange={() => handleRadio("sex", "female")}
                />
                {language === "en" ? "Female" : "หญิง"}
              </label>
            </div>
            {errors.sex && <span className={styles.error}>{errors.sex}</span>}
          </div>
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label className={styles.label}>
            {language === "en" ? "Phone" : "เบอร์โทรศัพท์"}
          </label>
          <input
            name="phone"
            className={`${styles.input} ${
              errors.phone ? styles.errorInput : ""
            }`}
            value={form.phone}
            onChange={handleChange}
            placeholder={
              language === "en"
                ? "Enter phone number (10 digits)"
                : "กรอกเบอร์โทร (10 หลัก)"
            }
          />
          {errors.phone && (
            <span className={styles.error}>{errors.phone}</span>
          )}
        </div>

        {/* Ethnicity */}
        <div className={styles.field}>
          <label className={styles.label}>
            {language === "en" ? "Ethnicity" : "สัญชาติ"}
          </label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                className={styles.radioInput}
                name="ethnicity"
                checked={form.ethnicity === "thai"}
                onChange={() => handleRadio("ethnicity", "thai")}
              />
              {language === "en" ? "Thai" : "ไทย"}
            </label>
            <label>
              <input
                type="radio"
                className={styles.radioInput}
                name="ethnicity"
                checked={form.ethnicity === "other"}
                onChange={() => handleRadio("ethnicity", "other")}
              />
              {language === "en" ? "Other" : "อื่น ๆ"}
            </label>
          </div>
          {form.ethnicity === "other" && (
            <input
              name="otherEthnicity"
              className={`${styles.input} ${
                errors.otherEthnicity ? styles.errorInput : ""
              }`}
              placeholder={
                language === "en"
                  ? "Specify nationality"
                  : "ระบุสัญชาติอื่น ๆ"
              }
              value={form.otherEthnicity}
              onChange={handleChange}
            />
          )}
          {errors.ethnicity && (
            <span className={styles.error}>{errors.ethnicity}</span>
          )}
          {errors.otherEthnicity && (
            <span className={styles.error}>{errors.otherEthnicity}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          <Save size={18} style={{ marginRight: 6 }} />
          {language === "en" ? "Save" : "บันทึก"}
        </button>
      </div>
    </form>
  );
}

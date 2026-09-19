import React from "react";
import { styles5 } from "../assets/dummyStyles";

function PersonGrid({list = [], roleLabel = ""}){
    if(!list || list.length === 0) return null;

    return(
        <div className={styles5.personGrid}>
            <div className={styles5.personHeader}>
                <div className={styles5.personDot}></div>
                <div className={styles5.personTitle}>{roleLabel}</div>
            </div>
            <div className={styles5.personList}>
                {list.map((p, i) => (
                    <div key={i} className={styles5.personItem}>
                        <div className='relative'>
                            <img src={p.preview || p.file || p.image || p.url || ""}
                             alt={p.name || `${roleLabel}-${i}`}
                             className={styles5.personAvatar}
                             />
                        </div>
                        <div className={styles5.personName}>{p.name || "-"}</div>
                        {p.role && p.role !== roleLabel && (
                            <div className={styles5.personRole}>{p.role}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PersonGrid;
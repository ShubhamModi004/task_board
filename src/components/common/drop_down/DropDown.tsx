'use client'
import React, { useState } from 'react'
import Image from 'next/image'
//styles
import styles from './DropDown.module.scss'

const DropDown = ({ selectedItem, onSelect }: { selectedItem: string, onSelect: (s: string) => void }) => {
    const [selected, setSelected] = useState(false);
    return (
        <div className={styles['container']}>
            <div className={styles['header']} onClick={() => { setSelected(!selected) }}>
                <div className={styles['img_cont']}>
                    <Image width={14} height={14} src={"/assets/icons/music.svg"} alt={"icon"} />
                </div>
                <span className={styles['title']}>my workspace</span>
                <Image className={selected ? styles['arrow_down'] : styles['arrow_cont']} width={14} height={14} src={"/assets/icons/arrow.svg"} alt={"arrow"} />
            </div>
            {selected && <div className={styles['drop_down_cont']}>
                <div className={styles['item']}>
                    <div onClick={() => { onSelect('Issues') }} className={`${styles['title_cont']} ${selectedItem == 'Issues' && styles['selected']}`}>
                        <Image width={16} height={16} src={"/assets/icons/issues.svg"} alt={"icon"} />
                        <span className={styles['item-title']}>Issues</span>
                    </div>
                    <div className={styles['list_cont']}>
                        <div onClick={() => { onSelect('Frontend') }} className={`${styles['filter_cont']} ${selectedItem == 'Frontend' && styles['selected']} `}>
                            <span className={styles['filter-title']}>Frontend</span>
                        </div>
                        <div onClick={() => { onSelect('Cloud') }} className={`${styles['filter_cont']} ${selectedItem == 'Cloud' && styles['selected']}`}>
                            <span className={styles['filter-title']}>Cloud</span>
                        </div>
                        <div onClick={() => { onSelect('Performance') }} className={`${styles['filter_cont']} ${selectedItem == 'Performance' && styles['selected']}`}>
                            <span className={styles['filter-title']}>Performance</span>
                        </div>
                        <div onClick={() => { onSelect('Backend') }} className={`${styles['filter_cont']} ${selectedItem == 'Backend' && styles['selected']}`}>
                            <span className={styles['filter-title']}>Backend</span>
                        </div>
                        <div onClick={() => { onSelect('Qa') }} className={`${styles['filter_cont']} ${selectedItem == 'Qa' && styles['selected']}`}>
                            <span className={styles['filter-title']}>Qa</span>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default DropDown
"use client";
import React, { useEffect, useRef } from "react";
import styles from "@/components/GalletyWidget2.module.css";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  {
    title: "Sunset Beach",
    imageUrl:
      "https://framerusercontent.com/images/XgnuKppjgSyRrt3c9nm9nuJAFE.jpg",
    link: "/sunset",
  },
  {
    title: "Forest Path",
    imageUrl:
      "https://framerusercontent.com/images/SoxWVcoE2JisAPtQspxmMPTJhEg.jpg",
    link: "/forest",
  },
  {
    title: "City Lights",
    imageUrl:
      "https://framerusercontent.com/images/IpGEVmlbLGeaNaABZkayk9Cs.jpg",
    link: "/city",
  },
  {
    title: "Mountain Range",
    imageUrl:
      "https://framerusercontent.com/images/3EAtjF5fPR3dm9Pwh84FpFsGPI.jpg",
    link: "/mountains",
  },
  {
    title: "Ocean View",
    imageUrl:
      "https://framerusercontent.com/images/tZNk5u2gae7RvpOk3adI9ODVrEk.jpg",
    link: "/ocean",
  },
  {
    title: "Desert Dunes",
    imageUrl:
      "https://framerusercontent.com/images/hm87nKco0qMSAGXgTnHczT6TsY.jpg",
    link: "/desert",
  },
];

const GalleryWidget2 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(
      `.${styles.GalleryListCntr}`
    );

    elements.forEach((el) => {
      const imgContainer = el.querySelector(`.${styles.GalleryImgCntr}`);

      gsap.fromTo(
        imgContainer,
        {
          scale: 0.25,
        },
        {
          scale: 1,
          //   duration:1.2,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 100%",
            scrub: 2,
          },
        }
      );
    });
  }, []);
useEffect(() => {
  const cursor = document.getElementById("custom-cursor");
  const imgElements = containerRef.current.querySelectorAll(`.${styles.GalleryImgCntr}`);

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  let isHovering = false;
  let raf;

  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  const animate = () => {
    pos.x = lerp(pos.x, mouse.x, 0.15);
    pos.y = lerp(pos.y, mouse.y, 0.15);
    cursor.style.left = `${pos.x}px`;
    cursor.style.top = `${pos.y}px`;
    raf = requestAnimationFrame(animate);
  };

  const handleMouseEnter = () => {
    isHovering = true;
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    raf = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    isHovering = false;
    cursor.style.transform = "translate(-50%, -50%) scale(0)";
    cancelAnimationFrame(raf);
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  imgElements.forEach((el) => {
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mousemove", handleMouseMove);
  });

  return () => {
    imgElements.forEach((el) => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mousemove", handleMouseMove);
    });
    cancelAnimationFrame(raf);
  };
}, []);



  return (
    <div className={styles.GalleryWidget2Wrapper}>
      <div className={styles.GalleryWidget2Inner}>
        <div className={styles.GalleryCardListWrapper} ref={containerRef}>
          <div className={styles.customCursor} id="custom-cursor">
            <span className={styles.arrow}>&rarr;</span>
          </div>
          {galleryData.map((item, idx) => (
            <div className={styles.GalleryListCntr} key={idx}>
              <div className={styles.GalleryListCntrLeftText}>
                {/* <h1>{item.title}</h1> */}
                <div className={styles.Gallerytextcntrinner}>
                  <h2 className={styles.galleyTitle}>Nike Revolution</h2>
                  <p className={styles.gallerypara}>Nike</p>
                </div>
                <div className={styles.ViewgalleryBtnWrapper}>
                  <Link href={""} className={styles.ViewgalleryBtnInner}>
                    <div className={styles.ViewgalleryBtnInnercntr}>
                      <div className={styles.btnDot}></div>
                      <span className={styles.btnText}>View</span>
                    </div>
                  </Link>
                </div>
              </div>
              <Link href={item.link} className={styles.GalleryImgCntr}>
                <div className={styles.GalleryImgCntrInner}>
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryWidget2;

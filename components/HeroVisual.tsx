"use client";

import { useState } from "react";
import ElectricBorder from "./ElectricBorder";
import ProfileCard from "./ProfileCard";
import { profile } from "@/lib/data";

export default function HeroVisual() {
  const [isSurging, setIsSurging] = useState(false);

  const handleContactClick = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <div
      className="reveal relative max-w-[315px] xs:max-w-[340px] sm:max-w-[370px] w-full mx-auto md:mr-0 md:justify-self-end select-none overflow-visible"
      onPointerEnter={() => setIsSurging(true)}
      onPointerLeave={() => setIsSurging(false)}
    >
      {/* Background Liverpool Red & Gold Ambient Radiance */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-3xl opacity-60 pointer-events-none transition-opacity duration-500 blur-2xl"
        style={{
          background: isSurging
            ? "radial-gradient(circle at 50% 50%, rgba(200, 16, 46, 0.35) 0%, rgba(246, 235, 97, 0.18) 45%, transparent 75%)"
            : "radial-gradient(circle at 50% 50%, rgba(200, 16, 46, 0.2) 0%, rgba(212, 180, 99, 0.1) 45%, transparent 75%)",
        }}
      />

      {/* Electric Border Wrapping the 3D ProfileCard */}
      <ElectricBorder
        color="#C8102E"
        secondaryColor="#F6EB61"
        speed={isSurging ? 2.2 : 1}
        chaos={isSurging ? 0.2 : 0.12}
        thickness={isSurging ? 2.4 : 1.8}
        borderRadius={24}
        className="w-full relative shadow-[0_25px_60px_-15px_rgba(200,16,46,0.35)]"
      >
        <ProfileCard
          avatarUrl="/projects/profile.jpg"
          miniAvatarUrl="/projects/profile.jpg"
          name={profile.name}
          title={profile.title}
          handle="raffahamizan02"
          status="Available"
          contactText="Contact"
          onContactClick={handleContactClick}
          cardRadius="24px"
          enableTilt={true}
          behindGlowEnabled={true}
          behindGlowColor="rgba(200, 16, 46, 0.65)"
          behindGlowSize="55%"
          innerGradient="linear-gradient(145deg, rgba(200, 16, 46, 0.3) 0%, rgba(246, 235, 97, 0.15) 50%, rgba(10, 10, 10, 0.95) 100%)"
          className="w-full"
        />
      </ElectricBorder>
    </div>
  );
}
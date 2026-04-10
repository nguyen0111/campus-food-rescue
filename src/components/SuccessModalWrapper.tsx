"use client";

import dynamic from "next/dynamic";

const SuccessModal = dynamic(() => import("./SuccessModal"), { ssr: false });

export default function SuccessModalWrapper() {
  return <SuccessModal />;
}

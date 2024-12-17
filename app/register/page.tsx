"use client"; // Marks this as a client-side component

import { MultiStepForm } from "@/components/multi-step-form";

interface LineUserData {
  usersId: string;
  displayName: string;
  pictureUrl: string;
}

interface HomeProps {
  lineUserData: LineUserData;
}

export default function Home({ lineUserData }: HomeProps) {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-7">
      <MultiStepForm   />
    </main>
  );
}

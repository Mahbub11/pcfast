import React, { useState } from "react";

const data = {
  Mentor: [
    {
      name: "Dr. MEHEDI KAYSER",
      degree: "MA in Applied Linguistics & ELT",
      institute: "Dhaka University, Bangladesh",
      quote:
        "Language is more than grammar—it's confidence. My role is to help learners find both",
    },
    {
      name: "Mr. John Doe",
      degree: "MA in English",
      institute: "Dhaka University, Bangladesh",
      quote:
        "Behind every fluent speaker is someone who believed in their first uncertain sentence.",
    },
    {
      name: "Ms. Jane Ray",
      degree: "MA in English",
      institute: "Dhaka University, Bangladesh",
      quote:
        "We’re not correcting mistakes; we’re building bridges to understanding.",
    },
  ],
  Support: [{ name: "Ali Kawsar", degree: "ali.support@prcticemania.com", quote: "Here to help." }],
  Internal: [
    {
      name: "MD Mahbub Rahim",
      degree: "Founder",
      institute: "mahbub@practicemania.com",
      quote:
        "Empowering learners with confidence and clarity—because language should be a bridge, not a barrier.",
    },
    {
      name: "Shamsun Nahar",
      degree: "Co-Founder",
      institute: "sheuli@practicemania.com",
      quote:
        "We’re not just enhancing English proficiency—we’re unlocking opportunities, one conversation at a time.",
    },
  ],
};

export default function InternalTeam() {
  const [selected, setSelected] = useState("Mentor");

  return (
    <div className="h-auto w-[70%] mx-auto mt-5">
      <h2 className="font-lobster text-[50px] text-center mr-10">Team</h2>

      {/* Selection Buttons */}
      <div className="mt-5 w-full font-poppins">
        <div className="flex md:gap-10 sm:gap-2 w-full mx-auto justify-center">
          {["Mentor", "Support", "Internal"].map((role) => (
            <div
              key={role}
              className={`cursor-pointer transition-colors duration-300 ${
                selected === role ? "bg-home text-white" : "bg-home/30"
              } h-fit py-3 w-full sm:px-3 md:px-10 text-center rounded`}
              onClick={() => setSelected(role)}
            >
              <h2 className="h-full">{role}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data[selected].map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-5 text-center"
          >
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member?.degree}</p>
            <p className="text-gray-600">{member?.institute}</p>
            <blockquote className="italic mt-2">"{member.quote}"</blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}

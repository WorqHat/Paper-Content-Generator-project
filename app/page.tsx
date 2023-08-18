"use client"
import React, { useState } from 'react';
import { IconSquareRoundedNumber1Filled, IconSquareRoundedNumber2Filled, IconSquareRoundedNumber3Filled } from "@tabler/icons-react";
import Layout from './layout';
import Image from 'next/image';

export default function Home() {
  const [abstract, setAbstract] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const socialMediaLinks = [
    { name: 'Instagram', icon: '/instagram-icon.svg', url: 'https://instagram.com/worqhat' },
    { name: 'Discord', icon: '/discord-icon.svg', url: 'https://discord.gg/KHh9mguKBx' },
    { name: 'LinkedIn', icon: '/linkedin-icon.svg', url: 'https://linkedin.com/company/worqhat' },
    { name: 'Twitter', icon: '/twitter-icon.svg', url: 'https://twitter.com/worqhat' },
    { name: 'GitHub', icon: '/github-icon.svg', url: 'https://github.com/worqhat' },
  ];

  const generateContent = async (selectedOption: string) => {
    setIsLoading(true);
    try {
      const question = `Generate ${selectedOption} for the given abstract:\n${abstract}`;
      const requestData = {
        question,
        randomness: 0.4,
      };

      const response = await fetch('https://api.worqhat.com/api/ai/content/v2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'U2FsdGVkX187FPQxzgbmIVjXh3O1+xyor30KWVrIBMuFEqGv8NfzXPjE53e3Ju+T',
          'x-org-key': 'U2FsdGVkX19lq3bhhF5TRouMiyL2HvEBD2V5j5nNl6dNL9JWPbsXW0rqlzssW8GieFki6oRVDKTb/z01Hc7m+Q==',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.content) {
        setGeneratedContent(data.content);
      } else {
        console.error('Error generating content: Unexpected API response format');
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center items-center" style={{ backgroundColor: "#00071B" }}>
    <div className='logo' style={{ position: 'absolute', top: '0', left: '0', margin: '1%', fontSize: 'medium' }}>
      <Image src="/logo.png" alt="Logo" width={100} height={50} />
    </div>
    <div className='social-icons' style={{ position: 'absolute', top: '0', right: '0', margin: '10px', fontSize: 'medium', display: 'flex' }}>
      {socialMediaLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
          <Image src={link.icon} alt={link.name} width={20} height={20} />
        </a>
      ))}
    </div>
    <div className="container rounded-lg text-white m-20 p-14 w-full" style={{ backgroundColor: "#ffffff" }}>
        <h1 className="text-center text-4xl font-bold mb-6" style={{  color: "black" }}><strong>
          Information generator for Research paper by Worqhat</strong>
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <h2 className='m-1 p-1 font-bold' style={{  color: "black", textAlign: "center" }}>Abstract</h2>
            <textarea
              value={abstract}
              onChange={(event) => setAbstract(event.target.value)}
              className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl w-full h-38 md:h-60"
              placeholder="Paste your abstract here"
            ></textarea>
            <div className="mt-1 p-1 rounded-md items-center" style={{  color: "black",fontWeight: "bold" }}>
            <h2 className='m-1 p-1 font-bold' style={{  color: "black", textAlign: "center" }}>Select an option to generate</h2>
              <label htmlFor="dropdown" items-center ></label>
              
              <select
                id="dropdown"
                className="border rounded-md p-2 w-full" style={{ textAlign: "center",fontWeight: "bold" }}
                onChange={(event) => generateContent(event.target.value)}
              >
                <option value="Introduction">Introduction</option>
                <option value="Methodology">Methodology</option>
                <option value="Objectives">Conclusion</option>
              </select>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn rounded-md bg-green-600 text-white p-3 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
          <div className="flex-1">
          <h2 className='m-1 p-1 font-bold' style={{  color: "black", textAlign: "center" }}>Generated Response</h2>
            <textarea
              className="border-2 text-black rounded-md p-4 text-center drop-shadow-xl w-full h-40 md:h-96"
              id=""
              cols={40}
              rows={8}
              placeholder="Here you will get the generated response from Worqhat"
              value={isLoading ? 'Generating content...' : generatedContent}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}

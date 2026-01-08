"use client";
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    title?: string;
}

export default function FAQAccordion({ items, title = "Frequently Asked Questions" }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full">
            {title && (
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{title}</h2>
            )}
            <div className="space-y-3 max-w-3xl mx-auto">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                        >
                            <span className="font-semibold text-slate-900 pr-4">{item.question}</span>
                            <div className={`w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180 bg-blue-100' : ''}`}>
                                <svg className={`w-4 h-4 ${openIndex === index ? 'text-blue-600' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

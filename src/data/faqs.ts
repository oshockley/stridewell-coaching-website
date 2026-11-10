export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'Do I need any training experience to start?',
    answer:
      'No. About half of the clients I work with have never followed a structured program. Your first weeks focus on learning the main movement patterns with weights you can control, and everything progresses from there at a pace that fits you.',
  },
  {
    question: 'What equipment do I need?',
    answer:
      'In-person clients train at the Arcadia studio, which has everything. Online clients can train at a commercial gym, or at home with a few adjustable dumbbells and a bench. Tell me what you have during your consult and I’ll build the plan around it.',
  },
  {
    question: 'What’s the difference between online and in-person coaching?',
    answer:
      'Both get a custom plan, weekly check-ins, and nutrition guidance in the higher tiers. In-person coaching (Elite) adds a 1-on-1 session every week so I can coach your technique in real time. Online coaching (Foundation and Momentum) uses video form reviews and calls, so you can train anywhere and on your own schedule. Momentum also includes 2 in-person sessions a month if you’re local.',
  },
  {
    question: 'Do you help with nutrition?',
    answer:
      'Yes. Foundation includes a habit-based nutrition guide, while Momentum and Elite add personalized nutrition targets and meal guidance. I’m a Precision Nutrition Level 1 coach, so the focus is on sustainable habits, not crash diets or meal plans you’ll abandon. I don’t treat medical conditions; if you have one, I’ll work alongside your doctor or dietitian.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Monthly plans can be cancelled anytime with 7 days’ notice before your next billing date, with no fees. The 3-month option is paid up front at a 10% discount and runs for its full term, after which you can continue monthly or stop.',
  },
  {
    question: 'How fast will I see results?',
    answer:
      'Most clients notice better energy and sleep within 2 to 3 weeks, and clear strength gains within the first month. Visible body composition changes usually take 8 to 12 weeks of consistent training and nutrition. A realistic fat loss pace is about 0.5 to 1% of your bodyweight per week, and that’s the pace that tends to stay off.',
  },
]

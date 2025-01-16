module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sherpalPrimaryBgColor: 'var(--background-primary)',
        sherpalSecondaryBgColor: 'var(--background-secondary)',
        sherpalAccentBgColor: 'var(--background-accent)',
        sherpalNeutralBgColor: 'var(--background-neutral)',

        sherpalPrimaryTextColor: 'var(--text-primary)',
        sherpalSecondaryTextColor: 'var(--text-secondary)',
        sherpalAccentTextColor: 'var(--text-accent)',
        sherpalNeutralTextColor: 'var(--text-neutral)',

        sherpalPrimaryButtonColor: 'var(--button-primary)',
        sherpalSecondaryButtonColor: 'var(--button-secondary)',
        sherpalAccentButtonColor: 'var(--button-accent)',
        sherpalNeutralButtonColor: 'var(--button-neutral)',

        sherpalPrimaryBordergColor: 'var(--border-primary)',
        sherpalSecondaryBorderColor: 'var(--border-secondary)',
        sherpalAccentBordergColor: 'var(--border-accent)',
        sherpalNeutralBordergColor: 'var(--border-neutral)',
      },
      fontFamily: {
        sherpalReg: ['"Arial"', 'Minion Pro', 'Inter', 'sans-serif'],
      },
      fontSize: {
        h1: '24px',
        h2: '22px',
        h3: '20px',
        baseSize: '18px',
        smallSize: '16px',
        tiny: '14px',
        largeSize: '38px',
      },
      borderRadius: {
        reg: '20px',
      },
      boxShadow: {
        custom: '0 4px 16px rgba(0, 0, 0, 0.3)',
        custom1:
          '0 8px 24px rgba(0, 0, 0, 0.6), 10px 10px 30px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};

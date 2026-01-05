'use client';

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-[#f7dc6f] text-[#1b5276] hover:bg-[#d4af37]
      focus:ring-[#f7dc6f]
    `,
    secondary: `
      bg-[#1b5276] text-[#F8F5ED] hover:bg-[#0d2d42]
      focus:ring-[#1b5276]
    `,
    outline: `
      border-2 border-[#f7dc6f] text-[#1b5276] hover:bg-[#f7dc6f]
      hover:text-[#1b5276] focus:ring-[#f7dc6f]
    `,
    ghost: `
      bg-transparent text-[#1b5276] hover:bg-[#F8F5ED]
      focus:ring-[#f7dc6f]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

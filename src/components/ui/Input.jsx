export const Input = ({ ...props }) => (
  <input 
    {...props}
    className={`w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-blue-500 transition-all ${props.className}`}
  />
);

export const Button = ({ variant = 'primary', children, ...props }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-600 hover:bg-slate-500 text-white",
    outline: "border border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
  };
  
  return (
    <button 
      {...props} 
      className={`px-4 py-2 rounded-xl font-bold transition-all ${variants[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};
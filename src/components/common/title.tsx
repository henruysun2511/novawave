interface TitleProps {
  children: React.ReactNode; 
}

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 my-3">
      {children}
    </h1>
  );
}
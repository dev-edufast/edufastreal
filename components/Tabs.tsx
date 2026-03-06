import React, { createContext, useContext, useMemo, useState } from "react";

type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used within <Tabs />");
  }
  return ctx;
}

type TabsProps = {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
};

export function Tabs({ defaultValue, className = "", children }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  const contextValue = useMemo(() => ({ value, setValue }), [value]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

export function TabsList({ className = "", children }: TabsListProps) {
  return <div className={className}>{children}</div>;
}

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsTrigger({ value, className = "", children }: TabsTriggerProps) {
  const { value: active, setValue } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={className}
      aria-selected={isActive}
      style={{
        marginRight: "0.5rem",
        padding: "0.5rem 0.75rem",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        background: isActive ? "#2563eb" : "#fff",
        color: isActive ? "#fff" : "#111827",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsContent({ value, className = "", children }: TabsContentProps) {
  const { value: active } = useTabsContext();

  if (active !== value) return null;
  return <div className={className}>{children}</div>;
}

export default Tabs;

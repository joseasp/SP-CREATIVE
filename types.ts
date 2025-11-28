import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags?: string[];
}
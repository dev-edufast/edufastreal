import { useQuery } from "@tanstack/react-query";

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  fileUrl?: string;
  programCategory?: string;
}

export function useLeadMagnets() {
  return useQuery<LeadMagnet[]>({
    queryKey: ["leadMagnets"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return [
        {
          id: "1",
          title: "Program Guide 2024",
          description: "Complete guide to all our programs",
          thumbnailUrl: "/thumbnails/guide.png",
          fileUrl: "/downloads/guide.pdf",
        },
        {
          id: "2",
          title: "Career Roadmap",
          description: "Plan your career advancement",
          thumbnailUrl: "/thumbnails/roadmap.png",
          fileUrl: "/downloads/roadmap.pdf",
        },
        {
          id: "3",
          title: "Application Checklist",
          description: "Step-by-step application guide",
          thumbnailUrl: "/thumbnails/checklist.png",
          fileUrl: "/downloads/checklist.pdf",
        },
      ];
    },
  });
}

export default useLeadMagnets;

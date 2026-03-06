import React from "react";
import { Play, Quote, Award, Calendar } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

export interface Story {
  id: string | number;
  name?: string;
  studentName?: string;
  program?: string;
  programTitle?: string;
  graduationYear?: string;
  currentRole?: string;
  company?: string;
  quote?: string;
  storyHook?: string;
  imageUrl?: string;
  videoUrl?: string;
  achievements?: string[];
  category?: "career" | "entrepreneurship" | "higher-studies" | "social-impact" | string;
  // Additional props from success-stories.tsx
  previousRole?: string;
  personalJourney?: string;
  transformation?: string;
  currentImpact?: string;
  advice?: string;
  metrics?: {
    salaryIncrease?: string;
    monthsToPromotion?: number;
    newOpportunities?: number;
  };
}

interface StoryCardProps {
  story: Story;
  onPlayVideo?: (story: Story) => void;
  featured?: boolean;
  // Props from success-stories.tsx
  isExpanded?: boolean;
  isBookmarked?: boolean;
  isHighlighted?: boolean;
  animationDelay?: string;
  onToggleExpand?: (id: string | number) => void;
  onToggleBookmark?: (id: string | number) => void;
  onShare?: (story: Story) => void;
}

export function StoryCard({ story, onPlayVideo, featured = false }: StoryCardProps) {
  const categoryLabels: Record<string, string> = {
    career: "Career Growth",
    entrepreneurship: "Entrepreneurship",
    "higher-studies": "Higher Studies",
    "social-impact": "Social Impact",
  };

  const displayName = story.name || story.studentName || "Anonymous";
  const displayProgram = story.program || story.programTitle || "";
  const displayQuote = story.quote || story.storyHook || "";

  return (
    <div className={`story-card ${featured ? "featured" : ""}`}>
      <div className="story-image">
        {story.imageUrl ? (
          <img src={story.imageUrl} alt={displayName} />
        ) : (
          <div className="placeholder-image">
            <span>{displayName.charAt(0)}</span>
          </div>
        )}
        {story.videoUrl && (
          <Button
            variant="primary"
            size="icon-sm"
            className="play-button"
            onClick={() => onPlayVideo?.(story)}
          >
            <Play size={16} fill="currentColor" />
          </Button>
        )}
        {story.category && (
          <Badge variant="secondary" className="category-badge">
            {categoryLabels[story.category] || story.category}
          </Badge>
        )}
      </div>

      <div className="story-content">
        <div className="story-header">
          <h3 className="story-name">{displayName}</h3>
          {displayProgram && (
            <p className="story-program">
              {displayProgram}
              {story.graduationYear && ` • Class of ${story.graduationYear}`}
            </p>
          )}
        </div>

        {(story.currentRole || story.company) && (
          <div className="story-role">
            <p className="current-role">
              {story.currentRole || ""}
              {story.currentRole && story.company && " at "}
              {story.company || ""}
            </p>
          </div>
        )}

        {displayQuote && (
          <blockquote className="story-quote">
            <Quote size={16} className="quote-icon" />
            <p>{displayQuote}</p>
          </blockquote>
        )}

        {story.achievements && story.achievements.length > 0 && (
          <div className="story-achievements">
            <h4 className="achievements-title">
              <Award size={14} /> Key Achievements
            </h4>
            <ul>
              {story.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="story-footer">
          <span className="story-date">
            <Calendar size={14} />
            Shared on {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;

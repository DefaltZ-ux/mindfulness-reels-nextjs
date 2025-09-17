export const handleShareAffirmation = async (text: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        text: text,
      });
      console.log("Content shared successfully");
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  } else {
    alert("Web Share API is not supported in this browser.");
  }
};

export const handleShareWebsite = async (text: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        text: text,
      });
      console.log("Content shared successfully");
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  } else {
    alert("Web Share API is not supported in this browser.");
  }
};


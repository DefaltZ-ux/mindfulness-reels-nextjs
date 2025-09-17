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

export const handleShareWebsite = async () => {
  const title = "Mindfulness App"
  const text = "Discover inner peace with this amazing mindfulness app! 🧘‍♀️"
    const url = window.location.origin
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      console.log("Website shared successfully");
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  } else {
    alert("Web Share API is not supported in this browser.");
  }
};


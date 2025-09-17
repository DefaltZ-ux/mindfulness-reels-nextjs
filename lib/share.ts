import html2canvas from "html2canvas";

export interface ShareData {
  text: string;
  backgroundColor: string;
  slideId: string;
}

export async function captureSlideAsImage(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // Higher quality
    useCORS: true,
    allowTaint: true,
    width: element.offsetWidth,
    height: element.offsetHeight,
  });

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob!);
      },
      "image/png",
      0.9
    );
  });
}

export async function shareSlide(shareData: ShareData, imageBlob: Blob) {
  const shareText = `"${shareData.text}" - Mindfulness Moment`;

  // Check if Web Share API is supported and can share files
  if (
    navigator.share &&
    navigator.canShare?.({
      files: [
        new File([imageBlob], "mindfulness-quote.png", { type: "image/png" }),
      ],
    })
  ) {
    try {
      await navigator.share({
        title: "Mindfulness Quote",
        text: shareText,
        files: [
          new File([imageBlob], "mindfulness-quote.png", { type: "image/png" }),
        ],
      });
      return true;
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  }

  // Fallback: Download the image
  const url = URL.createObjectURL(imageBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mindfulness-quote-${shareData.slideId}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return false;
}

export async function copyImageToClipboard(imageBlob: Blob) {
  try {
    if (navigator.clipboard && "write" in navigator.clipboard) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": imageBlob,
        }),
      ]);
      return true;
    }
  } catch (error) {
    console.error("Error copying to clipboard:", error);
  }
  return false;
}

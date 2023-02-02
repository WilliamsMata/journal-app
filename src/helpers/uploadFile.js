export const uploadFile = async (file) => {
  if (!file) throw new Error("No file to upload");

  const cloudURL = "https://api.cloudinary.com/v1_1/williams-cloud/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Failed to upload the image");

    const cloudResp = await resp.json();

    //return the image url
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

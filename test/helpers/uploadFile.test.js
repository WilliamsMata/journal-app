import { v2 as cloudinary } from "cloudinary";
import { uploadFile } from "../../src/helpers/uploadFile";

cloudinary.config({
  cloud_name: "williams-cloud",
  api_key: "424962888922736",
  api_secret: "1Yo_pWGwn5TeiulhZKaPCJhU8FM",
  secure: true,
});

describe("Pruebas en uploadFile", () => {
  test("debe de subir el archivo correctamente a cloudinary ", async () => {
    const imageUrl =
      "https://images.unsplash.com/photo-1675356831541-1ab088f335f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "image.jpg");
    const url = await uploadFile(file);

    expect(typeof url).toBe("string");

    // delete image uploaded
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    await cloudinary.api.delete_resources(["journal/" + imageId], {
      resource_type: "image",
    });
  });

  test("Debe de retornar null", async () => {
    const file = new File([], "image.jpg");
    const url = await uploadFile(file);

    expect(url).toBe(null);
  });
});

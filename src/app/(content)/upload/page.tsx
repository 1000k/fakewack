import { put, list } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export default async function UploadForm() {
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      await put(imageFile.name, imageFile, {
        access: "public",
        addRandomSuffix: true,
      });
      revalidatePath("/");
    }
  }

  async function allImages() {
    const blobs = await list();
    return blobs;
  }
  const images = await allImages();

  return (
    <>
      <form action={uploadImage}>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" required />
        <button>Upload</button>
      </form>

      <section>
        {images.blobs.map((image) => (
          <Image
            priority
            key={image.pathname}
            src={image.url}
            alt="Image"
            width={200}
            height={200}
          />
        ))}
      </section>
    </>
  );
}

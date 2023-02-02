import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", minHeight: 500 }} cols={3} rowHeight={164}>
      {images?.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Note image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

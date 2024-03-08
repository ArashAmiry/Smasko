import { Form } from "react-bootstrap";

function ImageUpload({ image, setImage }: { image: string, setImage: (image: string) => void }) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Retrieve the first file from the file input, return early if no file is selected
        const file = e.target.files?.[0];
        if (!file) return;

        // Initialize FileReader to read the file
        const reader = new FileReader();

        reader.onloadend = () => {
            // Retrieve the file read result
            const result = reader.result;
            if (typeof result === 'string' || result instanceof ArrayBuffer) {
                // Set the Base64 string representation of the image
                setImage(result as string);
            }
        };
        
        // Read the file as a data URL (Base64 string)
        reader.readAsDataURL(file);
    };

    return (
        <Form.Group className="image-input my-3 p-4">
            <Form.Label> Choose an image for the recipe</Form.Label>
            {image && (
                <div className="mt-3">
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
            <Form.Control type="file" lang="en" onChange={handleImageChange} />
        </Form.Group>
    );
}

export default ImageUpload;
import { Form } from "react-bootstrap";

function ImageUpload({image, setImage} : {image: string, setImage: (image: string) => void}) {
    const handleImageChange = (e : React.ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement;
        if (inputElement.files) {
            const file = inputElement.files[0];
            setImage(URL.createObjectURL(file));
        }
    }

    return (
        <Form.Group className="image-input my-3 p-4">
            <Form.Label> Choose an image for the recipe</Form.Label>
                {image && (
                <div className="mt-3">
                    <img src={image} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                )}
            <Form.Control type="file" lang="en" onChange={(e) => handleImageChange(e)} />
        </Form.Group>
    );
}

export default ImageUpload;
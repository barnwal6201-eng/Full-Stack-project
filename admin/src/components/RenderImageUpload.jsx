import { addMoviePageStyles } from "../assets/dummyStyles";
import { ImageIcon, X } from "lucide-react";

const RenderImageUpload = ({ preview, previewClass, onRemove, onChange, label }) =>
        preview ? (
            <div className={addMoviePageStyles.previewContainer}>
                <img src={preview} alt="preview" className={previewClass} />
                <button type="button" onClick={onRemove} className={addMoviePageStyles.removeButton}>
                    <X className={addMoviePageStyles.removeIcon} />
                </button>
            </div>
        ) : (
            <label className={addMoviePageStyles.uploadContainer}>
                <div className={addMoviePageStyles.uploadContent}>
                    <div className={addMoviePageStyles.uploadIconContainer}>
                        <ImageIcon className={addMoviePageStyles.iconMd} />
                    </div>
                    <span className={addMoviePageStyles.uploadText}>{label}</span>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className={addMoviePageStyles.uploadInput}
                />
            </label>
        );

export default RenderImageUpload
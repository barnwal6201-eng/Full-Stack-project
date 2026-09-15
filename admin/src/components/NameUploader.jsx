import { addMoviePageStyles } from "../assets/dummyStyles";
import { X } from 'lucide-react';


function NamedUploader({ title, onFiles, items, remove, updatName, icon }) {
    return (
        <div className={addMoviePageStyles.uploaderContainer}>
            <div className={addMoviePageStyles.uploaderHeader}>
                <div className={addMoviePageStyles.uploaderTitle}>
                    {icon}
                    <h4 className={addMoviePageStyles.uploaderTitleText}>{title}</h4>
                </div>

                <label className={addMoviePageStyles.uploaderAddButton}>
                    + Add
                    <input type="file" multiple accept='image/*' onChange={onFiles} className={addMoviePageStyles.uploaderAddInput} />
                </label>
            </div>

            <div className={addMoviePageStyles.namedUploaderGrid}>
                {items && items.length ? (
                    items.map((it, idx) => (
                        <div key={idx} className={addMoviePageStyles.namedUploaderItem}>
                            <img src={it.preview} alt="preview" className={addMoviePageStyles.namedUploaderImage} />

                            <div className='flex-1'>
                                <input
                                    value={it.name}
                                    onChange={(e) => updatName(idx, e.target.value)}
                                    placeholder='Name'
                                    className={addMoviePageStyles.namedUploaderInput}
                                />
                                <div className={addMoviePageStyles.namedUploaderFileName}>
                                    File: {it.file?.name}
                                </div>
                            </div>
                            <button type='button' onClick={() => remove(idx)} className={addMoviePageStyles.uploaderItemRemove}>
                                <X className={addMoviePageStyles.uploaderItemRemoveIcon} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={addMoviePageStyles.uploaderEmpty}>
                        No images added
                    </div>
                )}
            </div>
        </div>
    )
}

export default NamedUploader;
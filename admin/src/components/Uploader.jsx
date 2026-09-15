import { addMoviePageStyles } from "../assets/dummyStyles";
import { X } from 'lucide-react';

function Uploader({ title, onFiles, items, remove, icon, updateMeta }) {
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

            <div className={addMoviePageStyles.uploaderGrid}>
                {items && items.length ? (
                    items.map((it, idx) => (
                        <div key={idx} className={addMoviePageStyles.uploaderItem}>
                            <img src={it.preview} alt="preview" className={addMoviePageStyles.uploaderItemImage} />
                            <button type='button' onClick={() => remove(idx)} className={addMoviePageStyles.uploaderItemRemove}>
                                <X className={addMoviePageStyles.uploaderItemRemoveIcon} />
                            </button>

                            {typeof it.name !== 'undefined' && (
                                <div className='mt-2'>
                                    <input
                                        value={it.name}
                                        onChange={(e) => updateMeta && updateMeta(idx, 'name', e.target.value)}
                                        placeholder='Name'
                                        className={addMoviePageStyles.uploaderItemInput}
                                    />
                                </div>
                            )}

                            {typeof it.role !== 'undefined' && (
                                <div className='mt-2'>
                                    <input
                                        value={it.role}
                                        onChange={(e) => updateMeta && updateMeta(idx, 'role', e.target.value)}
                                        placeholder='Role'
                                        className={addMoviePageStyles.uploaderItemInput}
                                    />
                                </div>
                            )}
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

export default Uploader;
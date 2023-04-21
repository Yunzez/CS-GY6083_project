import { useEffect } from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    // Close modal when the Escape key is pressed
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose]);

    // Close modal when the user clicks outside of it
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full md:max-w-md mx-auto">
                <div className="flex justify-end pt-4 pr-4">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition ease-in-out duration-150">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M18.3 5.7a1 1 0 0 1 0 1.4L13.42 12l4.88 4.88a1 1 0 0 1-1.42 1.42L12 13.42l-4.88 4.88a1 1 0 0 1-1.42-1.42L10.58 12 5.7 7.12a1 1 0 0 1 1.42-1.42L12 10.58l4.88-4.88a1 1 0 0 1 1.42 0z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-4 py-2">{children}</div>
            </div>
        </div>
    );
};

export default Modal;

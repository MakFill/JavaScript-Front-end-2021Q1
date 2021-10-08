import imports from '../../imports';
import { player } from '../../shared/constants';
import './avatar.css';

const avaInit = (): void => {
  imports.validate.avatarSelectBtn.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      imports.validate.avaImg.src = reader.result as string;
      imports.validate.headerAva.src = reader.result as string;
      player.avatar = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default avaInit;

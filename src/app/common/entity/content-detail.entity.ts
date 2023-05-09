import ContentInfo from '../contents/content-info';
import { ImageVisualTypeConstants, VideoVisualTypeConstants } from '../constants/content.constants';

export default interface ContentDetailEntity {
    content: ContentInfo;
    visualType: ImageVisualTypeConstants | VideoVisualTypeConstants;
    annotation: {
        up: string;
        bottom: string;
        left: string;
        right: string;
    };
}

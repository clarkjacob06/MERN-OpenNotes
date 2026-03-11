import Skeleton from 'react-loading-skeleton';
import styles from '../css/skeletonCard.module.css';

function SkeletonCard() {
    return(
        <>
            <div className={styles.skeletonCard}>
                <Skeleton className={styles.titleSkeleton} width='60%'></Skeleton>
                <Skeleton className={styles.dateSkeleton} width='25%'></Skeleton>
            </div>
        </>
    )
}

export default SkeletonCard
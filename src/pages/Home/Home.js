import BackGround from '~/layouts/components/BackGround';
import { useModal } from '~/hooks';

function Home() {
    const { isShowing, toggle } = useModal();
    return <BackGround isShowing={isShowing} toggle={toggle} />;
}

export default Home;

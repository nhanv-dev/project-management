import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { DEFAULT_IMAGE } from './UserAvatar';
import { useAppSelector } from '@redux/hook';
import { AuthSelectors } from '@redux/features/auth/authSelectors';

const UserCard = () => {
    const user = useAppSelector(AuthSelectors.getUser());

    return (
        <Card shadow="none" className="max-w-[200px] border-none bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="full" size="md" src={user?.avatar || DEFAULT_IMAGE} color="primary" />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{user?.name}</h4>
                        <h5 className="text-small tracking-tight text-default-500 font-semibold">
                            {user?.username}
                        </h5>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500">
                    Full-stack developer, @getnextui lover she/her
                    <span aria-label="confetti" role="img">
                        🎉
                    </span>
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">

                </div>
            </CardFooter>
        </Card>
    )
}

export default UserCard
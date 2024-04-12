import { Box, Button, ButtonGroup, Center, Flex, Image, Text } from '@chakra-ui/react'
import Bua from '../Components/Image/Bua.png'
import Keo from '../Components/Image/Keo.png'
import Bao from '../Components/Image/Bao.png'
import ChamHoiAnimated from '../Components/Image/chamhoianimated.gif'
import CardComponent from './CardComponent'
import { useState } from 'react'

const BuaKeoBao = () => {
    const [skills, setSkills] = useState([
        { id: 1, name: 'Búa', image: Bua, isSelect: false },
        { id: 2, name: 'Kéo', image: Keo, isSelect: false },
        { id: 3, name: 'Bao', image: Bao, isSelect: false }
    ])

    const [buttonNewRoud, setButtonNewRound] = useState(false)

    const [mySkill, setMySkill] = useState({
        status: 'Bạn đang chọn kỹ năng',
        name: null,
        image: ChamHoiAnimated
    })

    const [opponentSkill, setOpponentSkill] = useState({
        status: 'Đối thủ đang chọn kỹ năng',
        name: null,
        image: ChamHoiAnimated,
        isReady: false
    })

    const [result, setResult] = useState('Hai bên đang chuẩn bị ra chiêu')

    const handleRandomOpponent = () => {
        const randomIndex = Math.floor(Math.random() * skills.length)
        const randomSkill = skills[randomIndex]
        setOpponentSkill(randomSkill)
    }

    const handleResultBattle = () => {
        console.log('check myskill : ', mySkill)
        console.log('check opponent : ', opponentSkill)
        if (
            mySkill.name === 'Búa' && opponentSkill.name === 'Kéo' ||
            mySkill.name === 'Kéo' && opponentSkill.name === 'Bao' ||
            mySkill.name === 'Bao' && opponentSkill.name === 'Búa'
        ) {
            setResult('Bạn đã chiến thắng!')
        } else if (opponentSkill.name === mySkill.name) {
            setResult('Trận này kết quả hòa!')
        } else {
            setResult('Bạn đã thua!')
        }
    }

    const handleStartBattle = () => {
        const checkSkillBeforeStart = skills.some(item => item.isSelect === true)

        if (!checkSkillBeforeStart) {
            alert('Vui lòng chọn skill trước khi bắt đầu')
        } else {
            const startBattle = window.confirm('Bạn có muốn bắt đầu trận đấu ?')
            if (!startBattle) {
                alert('Trận đấu đã bị hủy')
            } else {
                setOpponentSkill((prevState) => ({ ...prevState, isReady: true }))
                handleResultBattle()
                setButtonNewRound(true)
            }
        }
    }

    const resetBattle = () => {
        const initialSkills = [
            { id: 1, name: 'Búa', image: Bua, isSelect: false },
            { id: 2, name: 'Kéo', image: Keo, isSelect: false },
            { id: 3, name: 'Bao', image: Bao, isSelect: false }
        ]

        setMySkill({
            status: 'Bạn đang chọn kỹ năng',
            name: null,
            image: ChamHoiAnimated
        })

        setOpponentSkill({
            status: 'Đối thủ đang chọn kỹ năng',
            name: null,
            image: ChamHoiAnimated,
            isReady: false
        })

        setResult('Hai bên đang chuẩn bị ra chiêu')
        setButtonNewRound(false)
        setSkills(initialSkills)
    }

    return (
        <>
            <Box>
                <Box width={1000} margin={'0 auto'} textAlign={'center'}>
                    <Box w={150} height={200} border={'1px solid black'} rounded={5} margin={'0 auto'} overflow={'hidden'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Image width={'80%'} src={!opponentSkill.isReady ? ChamHoiAnimated : opponentSkill.image} alt='' />
                    </Box>

                    <Text>
                        {!opponentSkill.isReady ? 'Đối thủ đang chuẩn bị' : `Đối thủ đã chọn ${opponentSkill.name}`}
                    </Text>
                </Box>

                <Flex flexDir={'column'} w={'fit-content'} m={'20px auto'} gap={5}>
                    <Text width={500} border={'1px solid #ccc'} p={4} rounded={5} textAlign={'center'}>
                        {!opponentSkill.isReady ? `Hai bên đang chuẩn bị ra chiêu` : result}
                    </Text>

                    <Button onClick={resetBattle} opacity={buttonNewRoud ? 1 : 0} colorScheme='twitter' >Bắt đầu round mới</Button>
                </Flex>


                <Box width={1000} margin={'0 auto'} textAlign={'center'}>
                    <Box w={150} height={200} border={'1px solid black'} rounded={5} margin={'0 auto'} overflow={'hidden'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Image width={'80%'} src={mySkill.image} alt='' />
                    </Box>

                    <Text>
                        {mySkill.name === null ? 'Hãy chọn 1 skill để đánh bại đối thủ' : ` Bạn đã chọn ${mySkill.name}`}
                    </Text>

                    <Center>
                        <Flex gap={5}>
                            {skills.map((item) => {
                                return (
                                    <CardComponent key={item.id} item={item} skills={skills} setSkills={setSkills} mySkill={mySkill} setMySkill={setMySkill} handleRandomOpponent={handleRandomOpponent} />
                                )
                            })}
                        </Flex>
                    </Center>

                    <ButtonGroup mt={5}>
                        <Button onClick={handleStartBattle} colorScheme='facebook'>Ra chiêu</Button>
                    </ButtonGroup>
                </Box>
            </Box >
        </>
    )
}

export default BuaKeoBao
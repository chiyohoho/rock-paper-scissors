import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const CardComponent = ({ item, skills, setSkills, setMySkill, handleRandomOpponent }) => {

    const handleChangeSkillSelect = (selectedSkill) => {
        const updatedSkills = skills.map(skill => {
            if (skill.id === selectedSkill.id) {
                return { ...skill, isSelect: !selectedSkill.isSelect }
            } else {
                return { ...skill, isSelect: false }
            }

        })
        setSkills(updatedSkills)
        setMySkill(selectedSkill)
        handleRandomOpponent()
    }

    return (
        <>
            <Box onClick={() => handleChangeSkillSelect(item)} _hover={{ borderColor: 'black' }} w={150} height={200} border={item.isSelect ? '1px solid black' : '1px solid #ccc'} rounded={5} overflow={'hidden'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Image width={item.name === 'Kéo' ? '80%' : '100%'} src={item.image} alt={item.name} />
            </Box>
        </>
    )
}

export default CardComponent
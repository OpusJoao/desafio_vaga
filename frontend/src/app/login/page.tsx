"use client"

import { Button, Card, Center, Container, Input, Stack, Text } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface FormValues {
  username: string
  password: string
}

export default function SignIn() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit(async (data) => {
    router.push('/dashboard')
    return
    try {
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });
    } catch (error) {
      console.log('signIn had an error', error)
    }
  });

  return (
    <Container centerContent={true} maxWidth={1200}>
      <Center height='100vh' width='100%'>
        <Card.Root width={'50%'}>
          <Card.Header>
            <Text textStyle='2xl' fontWeight='bold' textAlign='center'>Zestra Login</Text>
          </Card.Header>
          <Card.Body>
            <form onSubmit={onSubmit}>
              <Stack gap="4" align="flex-start" maxW="lg">
                <Field
                  orientation='horizontal'
                  label="Usuário"
                  invalid={!!errors.username}
                  errorText={errors.username?.message}
                >
                  <Input
                    {...register("username", { required: "Usuário é obrigatório." })}
                  />
                </Field>

                <Field
                  orientation='horizontal'
                  label="Senha"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <PasswordInput
                    {...register("password", { required: "Senha é obrigatória." })}
                  />
                </Field>

                <Button type="submit">Entrar</Button>
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </Container>
  )
}

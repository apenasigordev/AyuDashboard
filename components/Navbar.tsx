import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Switch, changeTheme, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import { Layout } from "./Layout";
import useSWR from 'swr'
import Link from 'next/link'
import {useEffect} from 'react'
const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function App() {
  const { data, error } = useSWR("/api/users/v1/@me", fetcher)
  
  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}>
          <Image src=""/>
          <Text b color="inherit" hideIn="xs">
            AYU
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={data?.avatar ?`https://cdn.discordapp.com/avatars/${data?.id}/${data?.avatar}?size=4096`:"https://cdn.discordapp.com/embed/avatars/0.png?size=4096"}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {data?"Logado como":"Você não está conectado"}
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {data?.username??""}
                </Text>
              </Dropdown.Item>
              
              <Dropdown.Item key="settings" withDivider>
                <Link href="/settings">Minhas configurações</Link>
              </Dropdown.Item>
              
              {data?<Dropdown.Item key="logout" withDivider color="error">
                <a href="/logout">Sair</a>
              </Dropdown.Item>
              :
              <Dropdown.Item key="login" withDivider>
                <a target='popup' href="/login">Conectar</a>
              </Dropdown.Item>
              }
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}

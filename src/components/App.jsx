import React from "react";
import { Text, Heading, Container, Box, Card, Button } from "@radix-ui/themes";
import ResTable from "./ResTable";
import Form from "./Form";
import Header from "./Header";
import { CollegeContext } from "../providers/CollegeProvider";
import User from "./User";
import { supabase } from "../utils/Supabase";

export default function App() {
  const { isLoading } = React.useContext(CollegeContext);
  const [session, setSession] = React.useState();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function singOutUser() {
    const { error } = await supabase.auth.signOut();
    // if (!error) console.log("logged out");
    // else console.warn("error while logging out ", error);
  }
  // console.log("session: ", session);
  const [countries, setCountries] = React.useState([]);
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        options: {
          skipBrowserRedirect: true,
        },
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (data) {
      // console.log("logged in", data);
      getColleges();
    }
  }

  React.useEffect(() => {
    getColleges();

    // signInWithEmail();
  }, []);

  async function getColleges() {
    let { data: collegelist, error } = await supabase
      .from("collegelist")
      .select("*");
    setCountries(collegelist);
  }

  // console.log("countries: ", countries);

  return (
    <Box style={{ borderRadius: "var(--radius-3)" }} p="4">
      <Container size="2">
        <Box mb="4">
          <>
            <Header />
            {!session ? (
              <Button variant="solid" onClick={signInWithEmail}>
                Login with Google
              </Button>
            ) : (
              <User
                imageURL={session.user.user_metadata.avatar_url}
                name={session.user.user_metadata.full_name}
                lastLogin={session.user.last_sign_in_at}
                singOut={singOutUser}
              />
            )}
          </>
        </Box>
        <Card>
          <Container size="2" p="2">
            <Heading size="6" mb="2" style={{ textTransform: "capitalize" }}>
              Track your college application
            </Heading>
            {!isLoading ? <Form /> : "loading..."}
          </Container>
        </Card>
        <ResTable />
      </Container>
    </Box>
  );
}

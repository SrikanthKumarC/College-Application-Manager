import React from "react";

export const CollegeContext = React.createContext();
import { supabase } from "../utils/Supabase";

const CollegeProvider = ({ children }) => {
  const [session, setSession] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  async function secureSignOutUser() {
    setIsLoading(true);
 const { error } = await supabase.auth.signOut();
 fetchDataFromServer();
 setIsLoading(false);
  }
  async function handleDelete(id) {
    setIsLoading(true);
    const { error } = await supabase.from("collegelist").delete().eq("id", id);
    if (error) console.warn("failed to delete");
    console.log("successfully deleted");
    fetchDataFromServer();
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchDataFromServer();

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

  const [collegeData, setCollegeData] = React.useState([]);

  // const editCollege = (id, name, applied, fee) => {
  //   setCollegeData(() => {
  //     let nextData = [...collegeData];
  //     nextData = collegeData.map((college) => {
  //       if (college.id === id) {
  //         college.name = name;
  //         college.fee = fee;
  //         college.applied = applied.toString();
  //       }
  //       return college;
  //     });
  //     console.log(nextData);
  //     return nextData;
  //   });
  // };

  async function editCollege(id, name, applied, fee) {
    setIsLoading(true)
    const { error } = await supabase
      .from("collegelist")
      .update({
        name: name,
        fee: fee,
        college_applied: applied,
        user_id: session.user.id,
      })
      .eq("id", id);

    if (error) console.warn("error while updating");
    setIsLoading(false)
    fetchDataFromServer();
  }

  async function addCollegeToServer(name, applied, fee) {
    setIsLoading(true);
    if (session.user.id) {
      const { data, error } = await supabase
        .from("collegelist")
        .insert({
          name: name,
          fee: fee,
          college_applied: applied.toString(),
          user_id: session.user.id,
        })
        .select();
      if (!error) console.log("successfully inserted data", data);
      else console.warn("error while inserting data", { error, data });
    } else {
      console.warn("no session");
    }
    setIsLoading(false);
  }

  async function fetchDataFromServer() {
    setIsLoading(true);
    const { data, error } = await supabase.from("collegelist").select();
    setIsLoading(false);
    // if (!error) {
    //   console.log("college data from server", data);
    // } else {
    //   console.warn("error while getting data", { error });
    // }
    if (error) return [];
    setCollegeData(data);
  }
  const handleSubmit = (name, applied, fee) => {
    addCollegeToServer(name, applied, fee);
    fetchDataFromServer();
  };
  return (
    <CollegeContext.Provider
      value={{
        handleSubmit,
        collegeData,
        setCollegeData,
        handleDelete,
        editCollege,
        isLoading,
        session,
        secureSignOutUser
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export default CollegeProvider;

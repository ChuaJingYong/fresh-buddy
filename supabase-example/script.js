// Replace with your actual Supabase project URL and public (anon) API key
const supabaseUrl = "https://ljayqylaoctzrcoypdns.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqYXlxeWxhb2N0enJjb3lwZG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mzc3MDcsImV4cCI6MjA2NjUxMzcwN30.n8BYG9aHBqPVl7NSv9sepNL7n8FxaIKbE7zZX-WU06w";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
    db: {
        schema: "public"
    }
});

console.log('supabase',supabase)

async function fetchTodos() {

    try{
        const { data, error} = await supabase.from("todos").select("*")
        console.log(data)

    } catch(error){
        console.error(`Error fetching items; ${error}`)
    }

}

// Call function
fetchTodos()

    // try {
    //     const { data, error } = await supabase
    //     .from("fridge_items")
    //     .select("*")
    //     .order("expiration_date", { ascending: true }); // optional: sort by expiry

    //     if (error) throw error;

    //     console.log("Fridge Items:", data);

    //     // Example: Display in browser (optional)
    //     const list = document.createElement("ul");
    //     data.forEach(item => {
    //     const li = document.createElement("li");
    //     li.textContent = `${item.name} (${item.category}) - Expires on ${item.expiration_date}`;
    //     list.appendChild(li);
    //     });
    //     document.body.appendChild(list);

    // } catch (err) {
    //     console.error("Error fetching fridge items:", err.message);
    // }
// }

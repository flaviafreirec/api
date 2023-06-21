const knex = require("../database/knex")

class NotesController {
  async create(request, response) {
      const { title, description, tags, links} = request.body;
      const { user_id } = request.params;

      const [note_id] = await knex("notes").insert({ //função insert retorna uma promise q se resolvida passa o valor da nota
        title,
        description,
        user_id
      });

      
      /*percorre os elementos da propriedade link e retorna um novo array p/ cada com o id da nota e o valor de link p/ url*/
      const linksInsert = links.map(link => {
        return {
          note_id,
          url: link
        }
      });

      /*insere o valor do return na tab links*/
      await knex("links").insert(linksInsert);

      

      const tagsInsert = tags.map(name => {
        return {
          note_id,
          name,
          user_id
        }
      });

      await knex("tags").insert(tagsInsert);

      response.json();

   }

   async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    return response.json({
    ...note,
    tags,
    links
  });
   }

   async delete(request, response) {
    const { id } = request.params; 
    await knex("notes").where({ id }).delete();

    return response.json();
   }

   async index(request, response) {
    const { user_id, title, tags } = request.query;

    let notes;

    

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());
      
      
      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.title")

    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({user_id}); // pega todas as tags do user
    const notesWithTags = notes.map(note => {  //percorre cada nota do usuario. filtrou cada nota do user onde o id da nota era igual na tag
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return { 
        ...note,
        tags: noteTags
      } //retornamos o conteudo da nota e as tags filtradas
    })

    return response.json(notesWithTags);
   }
}

module.exports = NotesController;
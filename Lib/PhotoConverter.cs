using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using cieclarke.Models;

namespace cieclarke.Lib
{

    public class PhotoConverter : JsonConverter<IList<Photo>>
    {
        public override IList<Photo> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return new List<Photo>();
        }

        public override void Write(Utf8JsonWriter writer, IList<Photo> value, JsonSerializerOptions options)
        {

            writer.WriteStartArray();

            foreach (var p in value)
            {
                writer.WriteStartObject();

                writer.WriteString("ID", p.ID);
                writer.WriteString("Title", p.Title);
                writer.WriteString("Uploaded", p.Uploaded.ToString());
                writer.WriteString("Type", p.Type.ToString());

                writer.WriteStartArray("Tags");
                foreach (var t in p.Tags)
                {
                    writer.WriteStringValue(t.ID);
                }
                writer.WriteEndArray();

                writer.WriteStartObject("SizeURLs");
                foreach (var s in p.SizeURLs)
                {
                    //writer.WriteStartObject();
                    writer.WriteString(s.Key.ToString(), s.Value.ToString());
                    //writer.WriteEndObject(); 

                }
                writer.WriteEndObject();




                writer.WriteEndObject();
            }



            writer.WriteEndArray();
        }
    }
}